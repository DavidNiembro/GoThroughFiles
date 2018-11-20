console.log("Hello")


/* GLOBAL VARIABLES
 *    Variables that needs to be global because used in different functions aso..
 */
let gothroughFilesData              =  null; // This will contain the lokijs ("files") collection (it's the variable that interacts with the database data)
let DATABASE_NAME                   =  "gothroughfiles.db";
let FOLDER_TO_WATCH_AND_TO_INDEX    =  "C:\\Users\\Dardan Iljazi\\Documents\\Dardan\\002CPNV\\ES\\"; //"\\\\sc-file-sv06\\Perso\\Eleve\\sc\\INFO\\NC\\";
let LAST_FOLDER_WATCHED_AND_INDEXED =  "C:\\Users\\Dardan\\";
/* !!END  GLOBAL VARIABLES!!*/

/* FILES
 *    Variables needed for files reading
 */
const readdirp = require('readdirp'); // Can read file recusrively into a folder
//const fs = require('fs'); // Is beeing replaced by greaceful-fs on 09.11.2018
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
const readline = require('readline');
const stream = require('stream');
/* !!END FILES!!*/

/* FILEWATCHER
 *    Variables needed to watch files modified/edited/deleted/added
 */
const chokidar = require('chokidar');

/* !!END FILEWATCHER!!*/

/* DATABASE/SEARCH
 *    Variables needed to store/create/update and search into the database with files: path,content aso..
 */
const loki = require("lokijs");
const lfsa = require('./node_modules/lokijs/src/loki-fs-structured-adapter.js');

let adapter = new lfsa();
var db = null;


if (fs.existsSync(DATABASE_NAME)) {
    console.log("Database already exists");
    db = new loki(DATABASE_NAME, {
        adapter: adapter
    });

    db.loadDatabase({}, function(result){
        gothroughFilesData = db.getCollection("gothroughFilesData");

        let dv = gothroughFilesData.find({'Path': {'$contains': "docx"}});

        console.log("dv: ");
        console.log(dv);
    });

}else {
    console.log("Database doesn't exists");
    db = new loki(DATABASE_NAME, {
        adapter: adapter,
        autoload: true,
        autoloadCallback: databaseInitialize,
        autosave: true,
        autosaveInterval: 4000
    });
}

/* !!END DATABASE/SEARCH!!*/

/* FUNCTIONS
 *
 */
function databaseInitialize() {
    console.log("databaseInitialize");
    gothroughFilesData = db.getCollection("gothroughFilesData");

    if (gothroughFilesData === null) {
        gothroughFilesData = db.addCollection("gothroughFilesData");

        main() // We execute the main when there is no database (Like at the first launch of the software or when database is deleted aso..)
    }else{ // Database already created
        // Here we put code when the database is already created (like look if the database is up to date ? .. This part will be coded at a time..)

        // Check if the folder we have to watch/index is the same as we have into the database, if not we call again if not all is ok
        if(LAST_FOLDER_WATCHED_AND_INDEXED.indexOf(FOLDER_TO_WATCH_AND_TO_INDEX) === -1){
            console.log("Not same folders, we go to main again ! ");
            main();
        }else{
            console.log("Same folders");
        }
    }
}


function main() {
    console.log("Main");

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
                    }else{ // If the extension is not indexable for its content, we put the
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
    // function (fileInfo) {
    //     let objectData = [];
    //     console.log("res.file");
    //     console.log(fileInfo.data);
    //     res.files.forEach(data => {
    //
    //
    //         //var text = fs.readFileSync(data.fullPath,'utf8')
    //
    //         // objectData.push({ "Path": data.fullPath.toString(), "content": text,"Name":data.name });
    //     });
    //
    // }, function (err, res) {
    //     console.log("Finished to treat all files");
    //     console.log(res);
    //     objectData = JSON.stringify(objectData);
    //      fs.writeFile("./src/base.json", objectData, function(err) {
    //          if(err) {
    //              return console.log(err);
    //          }
    //      });
    //     let searchRegex = new RegExp("application", 'i');
    //     let dv = gothroughFilesData.find({'content': {'$regex': searchRegex}});
    //     console.log(dv);
    // });
}


/*
 * Warning as said for chokidar the argument usePolling: true|false must be true when we watch folders on network
 */
chokidar.watch(FOLDER_TO_WATCH_AND_TO_INDEX, {ignoreInitial: true, followSymlinks: false, ignored: /(^|[\/\\])\../, persistent: true, usePolling: true, interval: 10, binaryInterval:30}).on('all', (event, path) => {
    console.log("event: " + event);
    console.log("path: " + path);

    switch(event){
        case "change": // File changed
            break;
        case "add": // File added

            break;
        case "error":
            break;
        case "unlink": // File deleted
            break;
        case "unlinkDir":
        case "addDir":
            // NORMALLY WE DON'T HAVE TO USE THESE RIGHT NOW (BUT I KEEP THEM IF NEEDED ONE DAY)
            break;
    }
});


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
    //var acceptedExtensions = ["php", "md", "txt", "vsdx", "css", "html", "rtf", "js", "xml", "json", "log", "ipt", "odt", "wks", "wpd", "sql"];
    var acceptedExtensions = ["docx", "md", "txt", "vsdx", "rtf", "xml", "odt","pages"];

    if(acceptedExtensions.indexOf(extension) >= 0){
        return true;
    }else{
        return false;
    }

}

/* !!END FUNCTIONS!!*/

