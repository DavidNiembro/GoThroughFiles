/** FILES
 *      Variables needed for files reading
 */
const readdirp = require('readdirp'); // Can read file recusrively into a folder
const fs = require('graceful-fs');
var ipc = require('electron').ipcMain;
const storage = require('electron-json-storage');
const LINQ = require('node-linq').LINQ;

var files = [];
let FOLDER_TO_WATCH_AND_TO_INDEX = null;
/* !!END FILES!!*/


/** REGEX
 *      Defined regex we will assign later. This is only done because we want those variables to be assigned 1 time for each new search.
 */
let regexAllWordsMustBePresentText;
let regexAtLeastOneWordMustBePresentText;
/* !!END REGEX!!*/

function search(file, parametres){
    fs.appendFileSync("./out.txt", "\r\nparametres:::: " + JSON.stringify(parametres) + "\r\n");

    if(fileContentIsIndexableForExtension(file.Name)) { // We can read the content of the actual file
        fs.appendFileSync("./out.txt", "\r\nfileContentIsIndexableForExtension(file.Name) " + file.Path + "\r\n" );

        if(parametres.searchInFile === false) { // If the user don't want to search into the file but only in the title (DEFAULT)
            return isMatchedInTitle(file, new RegExp(regexAllWordsMustBePresentText, "i"));
        } else{
            // Here make a non-restrictive search. We search for the content OR for the title
            // ALL WORDS in the content must match but AT LEAST ONE must match in the title.
            return  isMatchedInContent(file,    new RegExp(regexAllWordsMustBePresentText, "i")) ||
                isMatchedInTitle(file,      new RegExp(regexAtLeastOneWordMustBePresentText, "i"));
        }
    }
    else{ // We can't read the actual content of the file so we search in the title only
        fs.appendFileSync("./out.txt", "\r\nthe actualFile : " + file.Path + " HAS NOT AN EXTENSION we can read into the content \r\n" );

        return isMatchedInTitle(file, new RegExp(regexAllWordsMustBePresentText, "i"));
    }
}

function isMatchedInTitle(file, regex){

    if(file.Name.match(regex)) {
        fs.appendFileSync("./out.txt", "file.Name match with " + regex + "\r\n" );
        return true;
    }else {
        fs.appendFileSync("./out.txt", "file.Name DOEST NOT MATCH WITH " + regex + "\r\n" );
        return false;
    }
}

function isMatchedInContent(file, regex){

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


    if(fileContent.match(regex)){
        fs.appendFileSync("./out.txt", "The file " + file.Path + " match with the regex" + regex  + "\r\n\r\n");

        return true;
    }else {
        return false;
    }
}


/**
 * This method is called when the "Chercher" button is pressed on the interface.
 * 1. It actually goes into the folder we want to search something and index into memory (the files[] array) the path and name of the files.
 * When the 1. process is finisehd it then goes into this array and read file by file to search if conditions are met
 */
ipc.on('Search', function(event, data){
    let files = [];

    regexAllWordsMustBePresentText          = createRegexForCase("RGX_MATCH_ORDER_NOT_IMPORTANT_ALL_WORDS_MUST_BE_PRESENT",          data.word);
    regexAtLeastOneWordMustBePresentText    = createRegexForCase("RGX_MATCH_ORDER_NOT_IMPORTANT_AT_LEAST_ONE_WORD_MUST_BE_PRESENT",  data.word);

    fs.appendFileSync("./out.txt", JSON.stringify(data) + "\r\n\r\n" );


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
                .Where(function(file) { return search(file,{"listOfWordsToSearch": data.word, "searchInFile" : data.searchInFile});
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

function createRegexForCase(regexCase, listOfWords){
    fs.appendFileSync("./out.txt", "regexCase = " + regexCase + " listOfWords " + listOfWords + "\r\n=====\r\n");

    let regex = "";

    switch(regexCase){
        case "RGX_MATCH_ORDER_NOT_IMPORTANT_ALL_WORDS_MUST_BE_PRESENT":
            listOfWords.forEach(word => {
                regex += "(?=[\\s\\S]*"+word+")";
            });

            regex +=  ".+";

            fs.appendFileSync("./out.txt", "regex ::: = " + regex + "\r\n======\r\n");

            break;
        case "RGX_MATCH_ORDER_NOT_IMPORTANT_AT_LEAST_ONE_WORD_MUST_BE_PRESENT":

            fs.appendFileSync("./out.txt", "RGX_MATCH_ORDER_NOT_IMPORTANT_AT_LEAST_ONE_WORD_MUST_BE_PRESENT\r\n");

            listOfWords.forEach(function (value, i) {
                regex += "("+value+")";
                if(i < listOfWords.length-1){
                    regex += "|";
                }
            });

            break;
    }

    fs.appendFileSync("./out.txt", "regex result : " + regex + "\r\n");

    return regex;
}