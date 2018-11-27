/* FILES
 *    Variables needed for files reading
 */
const readdirp = require('readdirp'); // Can read file recusrively into a folder
//const fs = require('fs'); // Is beeing replaced by greaceful-fs on 09.11.2018
const fs = require('graceful-fs');
var ipc = require('electron').ipcMain;
const storage = require('electron-json-storage');
const LINQ = require('node-linq').LINQ;
var files = [];

/* !!END FILES!!*/


ipc.on('CheckDatabase', function(event, data){

});

function main() {
    readdirp( {root: FOLDER_TO_WATCH_AND_TO_INDEX, directoryFilter: ['!.git', '!*modules' ] })
        .on('data', function (entry) {
            let actualFilePath = entry.fullPath;
            let actualFileName = entry.name;

            files.push({
                Name : actualFileName,
                Path: actualFilePath.toString(),
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
    //var acceptedExtensions = ["php", "md", "txt", "vsdx", "css", "html", "rtf", "js", "xml", "json", "log", "ipt", "odt", "wks", "wpd", "sql"];
    var acceptedExtensions = ["docx", "doc", "md", "txt", "vsdx", "rtf", "xml", "ipt", "odt","pages"];

    if(acceptedExtensions.indexOf(extension) >= 0){
        return true;
    }else{
        return false;
    }

}

function search(file, parametres){

    if(fileContentIsIndexableForExtension(file.Name)) {
        if(file.Name.includes(parametres.userString)) {
            return true;
        }else{

            var line = fs.readFileSync(file.Path, "utf8");

            if (line.includes(parametres.userString)) {
                return true;
            }else {
                return false;
            }
        }
    }

    else{
        if(file.Name.includes(parametres.userString)) {
            return true;
        }else{
            return false;
        }

    }
}

ipc.on('Search', function(event, string){

    files = [];

    readdirp( {root: FOLDER_TO_WATCH_AND_TO_INDEX, directoryFilter: ['!.git', '!*modules' ] })
        .on('data', function (entry) {
            let actualFilePath = entry.fullPath;
            let actualFileName = entry.name;

            files.push({
                Name : actualFileName,
                Path: actualFilePath.toString(),
            });

        })
        .on('err', function(error){
            console.log("error: " + error);
        })
        .on('end', function(msg){
            let dv = new LINQ(files)
                .Where(function(file) { return search(file,{"userString":string});
                });

            // .OrderBy(function(file) { return file;})
            // .ToArray();
            event.sender.send('returnSearch', dv);
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
        event.sender.send('sendPath', string);
    });

    FOLDER_TO_WATCH_AND_TO_INDEX = string;

});