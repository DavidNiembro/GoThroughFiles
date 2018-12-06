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
let FOLDER_TO_WATCH_AND_TO_INDEX = null;
/* !!END FILES!!*/


function search(file, parametres){

    let nameRegex = new RegExp(parametres.regex,"i");

    if(fileContentIsIndexableForExtension(file.Name)) { // We can read the content of the actual file
        fs.appendFileSync("./out.txt", "\r\nfileContentIsIndexableForExtension(file.Name) " + file.Path + "\r\n" );

        if(parametres.searchInFile === false) { // If the user don't want to search into the file but only in the title (DEFAULT)

            if(file.Name.match(nameRegex)) {
                fs.appendFileSync("./out.txt", "file.Name match with " + nameRegex + "\r\n" );
                return true;
            }else {
                fs.appendFileSync("./out.txt", "file.Name DOEST NOT MATCH WITH " + nameRegex + "\r\n" );
                return false;
            }

        } else{ // The user wants to search into the file content

            let fileExtensionRegex = new RegExp('.*\\.(\\w+)', 'i');
            let extension = file.Name.match(fileExtensionRegex)[1];

            fs.appendFileSync("./out.txt", "the actualFile : " + file.Name + " has an extension of " + JSON.stringify(extension) + "\r\n\r\n" );

            let fileContent = "";

            switch(extension){
                case 'pdf':
                    // pdf(dataBuffer).then(function(data) {
                    //     text = data.text
                    // });
                    // if(text.match(parametres.userString,"g")) {
                    //     return true;
                    // }else {
                    //     return false;
                    // }
                    // fileContent = ...;
                    break;
                default: // Default are all files that contain raw text in them like .txt/.doc aso
                    fs.appendFileSync("./out.txt", "Entered into DEFAULT in the switch\r\n" );
                    fileContent = fs.readFileSync(file.Path, "utf8");
                    break;
            }


            if(fileContent.match(parametres.regex)){
                fs.appendFileSync("./out.txt", "The file " + file.Path + " match with the regex" + parametres.regex  + "\r\n\r\n");

                return true;
            }else {
                return false;
            }
        }
    }
    else{ // We can't read the actual content of the file
        fs.appendFileSync("./out.txt", "\r\nthe actualFile : " + file.Path + " HAS NOT AN EXTENSION we can read into the content \r\n" );

        if(file.Name.match(nameRegex))
            return true;
        else
            return false;
    }
}


/**
 * This method is called when the "Chercher" button is pressed on the interface.
 * 1. It actually goes into the folder we want to search something and index into memory (the files[] array) the path and name of the files.
 * When the 1. process is finisehd it then goes into this array and read file by file to search if conditions are met
 */
ipc.on('Search', function(event, data){

    files = [];
    reg = "";

    data.word.forEach(word => {
        reg += "(?=.*"+word+")";
    });

    searchInFile = data.searchInFile;

    fs.appendFileSync("./out.txt", JSON.stringify(data) + "\r\n\r\n" );
    fs.appendFileSync("./out.txt", "reg : " + reg + "\r\n" );
    fs.appendFileSync("./out.txt", "searchInFile : " + searchInFile + "\r\n" );

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

            files.forEach(file => {
                let statsFile = fs.statSync(file.Path);
                file.meta = statsFile;
            });

            let dv = new LINQ(files)
                .Where(function(file) { return search(file,{"userString":data, "regex":reg, "searchInFile" : searchInFile});
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
        FOLDER_TO_WATCH_AND_TO_INDEX = data;
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