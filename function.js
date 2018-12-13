/** FILES
 *      Variables needed for files reading
 */
const fs = require('graceful-fs');
var ipc = require('electron').ipcMain;
const storage = require('electron-json-storage');
PDFParser = require("pdf2json");
//var mammoth = require("mammoth");
const fg = require('fast-glob');
const fsPromises = require('fs').promises
const path = require('path');
var mammoth = require("mammoth");
const filter = require('promise-filter')

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
    //fs.appendFileSync("./out.txt", "\r\nparametres:::: " + JSON.stringify(parametres) + "\r\n");

    if(fileContentIsIndexableForExtension(file.Name)) { // We can read the content of the actual file
        //fs.appendFileSync("./out.txt", "\r\nfileContentIsIndexableForExtension(file.Name) " + file.Path + "\r\n" );

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
        //fs.appendFileSync("./out.txt", "\r\nthe actualFile : " + file.Path + " HAS NOT AN EXTENSION we can read into the content \r\n" );

        return isMatchedInTitle(file, new RegExp(regexAllWordsMustBePresentText, "i"));
    }
}

function isMatchedInTitle(file, regex){

    if(file.Name.match(regex)) {
        //fs.appendFileSync("./out.txt", "file.Name match with " + regex + "\r\n" );
        return true;
    }else {
        //fs.appendFileSync("./out.txt", "file.Name DOEST NOT MATCH WITH " + regex + "\r\n" );
        return false;
    }
}
function isMatchedInContent(file, regex){

    if(file.content!== null && file.content.match(regex)){
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
ipc.on('Search', function(event, parametres){
    let entries = [];
    reg = "";

    parametres.word.forEach(word => {
        reg += "(?=.*"+word+")";
    });
    searchInFile = parametres.searchInFile;

    regexAllWordsMustBePresentText          = createRegexForCase("RGX_MATCH_ORDER_NOT_IMPORTANT_ALL_WORDS_MUST_BE_PRESENT",          parametres.word);
    regexAtLeastOneWordMustBePresentText    = createRegexForCase("RGX_MATCH_ORDER_NOT_IMPORTANT_AT_LEAST_ONE_WORD_MUST_BE_PRESENT",  parametres.word);

    let stream = fg.async([FOLDER_TO_WATCH_AND_TO_INDEX+'/*']);
    stream.then(async (data)=>{
        let promData = new Promise(function (resolve, reject) {
            data.forEach( async pathFile => {
                let stat = null;
                let content = "";
                let name = path.basename(pathFile);
                stat = await fsPromises.stat(pathFile)
                
                let fileExtensionRegex = new RegExp('.*\\.(\\w+)', 'i');
                let extension = name.match(fileExtensionRegex)[1];
                switch(extension){
                    case "pdf":{
                        let pdfParser = new PDFParser(this,1);
                        pdfParser.loadPDF(pathFile);
                        let fileTest = new Promise(function (resolves, reject) {
                                            pdfParser.on("pdfParser_dataReady", function(fileContent) {
                                                resolves(pdfParser.getRawTextContent())
                                            })
                                        })
                        content = await fileTest.then(data => {return data})
                        break;
                    }
                    case "txt":{
                        content = fs.readFileSync(pathFile, "utf8");
                        break;
                    }
                    case "docx":{
                        let prom = new Promise(function (resolves, reject) {
                            mammoth.extractRawText({path:pathFile})
                            .then(function(result){
                                resolves(result.value);
                            }) 
                        });
                        
                       // content = await prom.then(data => {return data});
                        //fs.appendFileSync("./out.txt", content + "\r\n\r\n");
                        break;
                    }
                    default:{
                        break;
                    }
                   
                }
                entries.push({"Name":path.basename(pathFile),"Path":pathFile,"stat":stat,"content":content})  

                if(data.length == entries.length){
                    resolve()
                }
            })
        })
     
        dvs = await promData.then(datas => {
        
            let test = Promise.resolve(entries)
            .then(filter((word) => search(word,{"userString":parametres, "regex":reg, "searchInFile" : searchInFile})))

            test.then((dv)=>{
                event.sender.send('returnSearch', dv);
            })       
        })
    })
});
/* !!END FUNCTIONS!!*/

ipc.on('getPath', function(event, string){

    storage.has('path', function(error, hasKey) {
        if (error) throw error;
       
        if (hasKey) {
            storage.get('path', function(error, data) {
                if (error) throw error;
                FOLDER_TO_WATCH_AND_TO_INDEX = data;
                event.sender.send('databasePath', data)
            });
        }else{
            event.sender.send('databasePath', null)
        }
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
    var acceptedExtensions = ["docx", "doc", "md", "txt", "vsdx", "rtf", "xml", "ipt", "odt","pages","pdf"];

    if(acceptedExtensions.indexOf(extension) >= 0){
        return true;
    }else{
        return false;
    }

}

function createRegexForCase(regexCase, listOfWords){
    //fs.appendFileSync("./out.txt", "regexCase = " + regexCase + " listOfWords " + listOfWords + "\r\n=====\r\n");

    let regex = "";

    switch(regexCase){
        case "RGX_MATCH_ORDER_NOT_IMPORTANT_ALL_WORDS_MUST_BE_PRESENT":
            listOfWords.forEach(word => {
                regex += "(?=[\\s\\S]*"+word+")";
            });

            regex +=  ".+";

            //fs.appendFileSync("./out.txt", "regex ::: = " + regex + "\r\n======\r\n");

            break;
        case "RGX_MATCH_ORDER_NOT_IMPORTANT_AT_LEAST_ONE_WORD_MUST_BE_PRESENT":

            //fs.appendFileSync("./out.txt", "RGX_MATCH_ORDER_NOT_IMPORTANT_AT_LEAST_ONE_WORD_MUST_BE_PRESENT\r\n");

            listOfWords.forEach(function (value, i) {
                regex += "("+value+")";
                if(i < listOfWords.length-1){
                    regex += "|";
                }
            });

            break;
    }

    //fs.appendFileSync("./out.txt", "regex result : " + regex + "\r\n");

    return regex;
}