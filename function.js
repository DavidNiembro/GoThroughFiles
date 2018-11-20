/* FILES
 *    Variables needed for files reading
 */
const readdirp = require('readdirp'); // Can read file recusrively into a folder
//const fs = require('fs'); // Is beeing replaced by greaceful-fs on 09.11.2018
const fs = require('graceful-fs');
const readline = require('readline');
const stream = require('stream');
var ipc = require('electron').ipcMain;
const storage = require('electron-json-storage');
/* !!END FILES!!*/

/* GLOBAL VARIABLES
 *    Variables that needs to be global because used in different functions aso..
 */
let gothroughFilesData              =  null; // This will contain the lokijs ("files") collection (it's the variable that interacts with the database data)
let DATABASE_NAME                   =  "gothroughfiles.db";
let FOLDER_TO_WATCH_AND_TO_INDEX    =  "C:\\Users\\Anel.MUMINOVIC\\PhpstormProjects"; //"\\\\sc-file-sv06\\Perso\\Eleve\\sc\\INFO\\NC\\";
let LAST_FOLDER_WATCHED_AND_INDEXED =  "C:\Users\Anel.MUMINOVIC\PhpstormProjects";
/* !!END  GLOBAL VARIABLES!!*/

/* DATABASE/SEARCH
 *    Variables needed to store/create/update and search into the database with files: path,content aso..
 */
const loki = require("lokijs");
const lfsa = require('./node_modules/lokijs/src/loki-fs-structured-adapter.js');

let adapter = new lfsa();
var db = null;

ipc.on('CheckDatabase', function(event, data){
    // FOLDER_TO_WATCH_AND_TO_INDEX = data;
  if (fs.existsSync(DATABASE_NAME)) {
    event.sender.send('actionReply', "Database already exists")
    db = new loki(DATABASE_NAME, {
      adapter: adapter
    });

  }else {
    event.sender.send('actionReply', "Database dont'exists")
    db = new loki(DATABASE_NAME, {
        adapter: adapter,
        autoload: true,
        autoloadCallback: databaseInitialize,
        autosave: true,
        autosaveInterval: 4000
    });
  }  
});
/* FUNCTIONS
 *
 */
function databaseInitialize() {
  console.log("databaseInitialize");
  gothroughFilesData = db.getCollection("gothroughFilesData");

  if (gothroughFilesData === null) {
      gothroughFilesData = db.addCollection("gothroughFilesData");

      main() // We execute the main when there is no database (Like at the first launch of the software or when database is deleted aso..)
  }else{
      // Database already created
      // Here we put code when the database is already created (like look if the database is up to date ? .. This part will be coded at a time..)

      // Check if the folder we have to watch/index is the same as we have into the database, if not we call again if not all is ok
      if(LAST_FOLDER_WATCHED_AND_INDEXED.indexOf(FOLDER_TO_WATCH_AND_TO_INDEX) === -1){
          console.log("Not same folders, we go to main again ! ");
          main();
      }else{
         console.log("Same folders");
      }
  }
  function main() {
    readdirp( {root: FOLDER_TO_WATCH_AND_TO_INDEX, directoryFilter: ['!.git', '!*modules' ] })
        .on('data', function (entry) {
            let newFile = true;
            let actualFile = null;
            let actualFilePath = entry.fullPath;
            let actualFileName = entry.name;
            let instream = fs.createReadStream(actualFilePath);
            let outstream = new stream;
            let rl = readline.createInterface(instream, outstream);

            rl.on('line', function (line) {
                if (newFile) {
                    newFile = false;
                    if(fileContentIsIndexableForExtension(actualFileName)) {
                        // console.log("File : " + actualFileName + " is indexable");
                        actualFile = gothroughFilesData.insert({
                            Path: actualFilePath.toString(),
                            content: line,
                            Name: actualFileName
                        })
                    }else{

                        // If the extension is not indexable for its content, we put the
                        // console.log("File : " + actualFileName + " is NOT indexable by content");
                        actualFile = gothroughFilesData.insert({
                            Path: actualFilePath.toString(),
                            Name: actualFileName
                        })
                    }
                }
                else {
                    if(fileContentIsIndexableForExtension(actualFileName)) {
                        actualFile.content = actualFile.content + line;
                        gothroughFilesData.update(actualFile)
                    }
                }
            });

            rl.on('close', function () {
                // do something on finish here
                //console.log("Terminated the file ! " + actualFileName + "\r\n")
            });
        })
        .on('err', function(error){
            console.log("error: " + error);
        })
        .on('end', function(msg){
            console.log("End ! " + msg);
        });
    
  }
    function fileContentIsIndexableForExtension(fileNameWithExtension){
        if(fileNameWithExtension.length === 0){
            return false;
        }

        let fileExtensionRegex = new RegExp('.*\\.(\\w+)', 'i');

        let extension = fileNameWithExtension.match(fileExtensionRegex);


        if(extension == null){
            return false;
        }

        extension = extension[1];

        if(fileNameWithExtensionIsInList(extension)){
            return true;
        }else{
            return false;
        }
    }


    function fileNameWithExtensionIsInList(extension){
      var acceptedExtensions = ["php", "md", "txt", "vsdx", "css", "html", "rtf", "js", "xml", "json", "log", "ipt", "odt", "wks", "wpd", "sql"];

      if(acceptedExtensions.indexOf(extension) >= 0){
          return true;
      }else{
          return false;
      }

    }
}

ipc.on('Search', function(event, string){
    db.loadDatabase({}, function(result){
        gothroughFilesData = db.getCollection("gothroughFilesData");

        let dv = gothroughFilesData.find({'content': {'$regex': [string, 'i']}});
        event.sender.send('returnSearch', dv)
    });

});
/* !!END FUNCTIONS!!*/

ipc.on('getPath', function(event, string){

    storage.get('path', function(error, data) {
        if (error) throw error;

        event.sender.send('databasePath', data)
    });


});
ipc.on('setPath', function(event, string){

    storage.set('path', string , function(error) {
        if (error) throw error;
        event.sender.send('sendPath', string)
    });


});