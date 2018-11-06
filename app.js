console.log("Hello")


/* GLOBAL VARIABLES
 *    Variables that needs to be global because used in different functions aso..
 */
let gothroughFilesData           = null; // This will contain the lokijs ("files") collection (it's the variable that interacts with the database data)
let DATABASE_NAME                = "gothroughfiles.db";
let FOLDER_TO_WATCH_AND_TO_INDEX = "C:\\Users\\Dardan.Iljazi\\";
/* !!END  GLOBAL VARIABLES!!*/


/* FILES
 *    Variables needed for files reading
 */
const readdirp = require('readdirp'); // Can read file recusrively into a folder
const fs = require('fs');
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
let db = new loki(DATABASE_NAME, {
    adapter : adapter,
    autoload: true,
    autoloadCallback : databaseInitialize,
    autosave: true,
    autosaveInterval: 4000
});
/* !!END DATABASE/SEARCH!!*/



/* FUNCTIONS
 *
 */

function databaseInitialize() {
    gothroughFilesData = db.getCollection("gothroughFilesData");

    if (gothroughFilesData === null) {
        gothroughFilesData = db.addCollection("gothroughFilesData");
        gothroughFilesData.insert("");
        main() // We execute the main when there is no database (Like at the first launch of the software or when database is deleted aso..)
    }else{ // Database already created
        // Here we put code when the database is already created (like look if the database is up to date ? .. This part will be coded at a time..)


        // Check if the folder we have to watch/index is the same as we have into the database, if not we call again if not all is ok

    }
}

function main() {
    readdirp({root: FOLDER_TO_WATCH_AND_TO_INDEX, directoryFilter: ['!.git', '!*modules']},
        function (fileInfo) {
        }, function (err, res) {
            let objectData = [];

            res.files.forEach(data => {
                var newFile = true;
                var actualFile = null;
                var actualFileName = data.fullPath;
                var instream = fs.createReadStream(data.fullPath);
                var outstream = new stream;
                var rl = readline.createInterface(instream, outstream);

                rl.on('line', function (line) {
                    if (newFile) {
                        newFile = false;
                        actualFile = gothroughFilesData.insert({
                            Path: data.fullPath.toString(),
                            content: rl,
                            Name: data.name
                        })
                    }
                    else {
                        actualFile.content = actualFile.content + rl
                        gothroughFilesData.update(actualFile)
                    }
                });

                rl.on('close', function () {
                    // do something on finish here
                    console.log("Terminated the file ! " + actualFileName + "\r\n")
                });

                //var text = fs.readFileSync(data.fullPath,'utf8')

                // objectData.push({ "Path": data.fullPath.toString(), "content": text,"Name":data.name });
            });
            /*objectData = JSON.stringify(objectData);
             fs.writeFile("./src/base.json", objectData, function(err) {
                 if(err) {
                     return console.log(err);
                 }
             }); */
            // var searchRegex = new RegExp("application", 'i');
            // let dv = gothroughFilesData.find({'content': {'$regex': searchRegex}});
            // console.log(dv);
        });
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

/* !!END FUNCTIONS!!*/

