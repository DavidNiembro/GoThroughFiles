import React, { Component } from "react";
import "./App.css";
import Main from"./views/Main";
import Path from"./views/Path";
import SplashScreen from "./components/splashScreen/index";
const readdirp = require('./components/readdirp'); 
const readline = require('readline');
const stream = require('stream');
const fs = require('./components/graceful-fs');

/* GLOBAL VARIABLES
 *    Variables that needs to be global because used in different functions aso..
 */
let gothroughFilesData              =  null; // This will contain the lokijs ("files") collection (it's the variable that interacts with the database data)
let DATABASE_NAME                   =  "gothroughfiles.db";
let FOLDER_TO_WATCH_AND_TO_INDEX    =  "/users/davidniembro/desktop"; //"\\\\sc-file-sv06\\Perso\\Eleve\\sc\\INFO\\NC\\";
let LAST_FOLDER_WATCHED_AND_INDEXED =  "/users/davidniembro/desktop";
/* !!END  GLOBAL VARIABLES!!*/

/* DATABASE/SEARCH
 *    Variables needed to store/create/update and search into the database with files: path,content aso..
 */
const loki = require("lokijs");
const lfsa = require('./components/lokijs/src/loki-fs-structured-adapter');

let adapter = new lfsa();
var db = null;

class App extends Component {
    constructor(){
        super();
        this.state = {            
            view : "splash",
            //path : "/users/davidniembro/desktop",
            path : null,

        }
        this.loading()
        this.setPath = this.setPath.bind(this);
    }


    componentDidMount(){
        if (fs.existsSync(DATABASE_NAME)) {
            console.log("Database already exists");
            db = new loki(DATABASE_NAME, {
                adapter: adapter
            });
        
            db.loadDatabase({}, function(result){
                gothroughFilesData = db.getCollection("gothroughFilesData");
        
                let dv = gothroughFilesData.find({'content': {'$regex': ['<head>', 'i']}});
                console.log(dv);
            });
        }else {
            console.log("Database doesn't exists");
            db = new loki(DATABASE_NAME, {
                adapter: adapter,
                autoload: true,
                autoloadCallback: this.databaseInitialize,
                autosave: true,
                autosaveInterval: 4000
            });
        }
        
    }

    databaseInitialize() {
        console.log("databaseInitialize");
        let that = this;
        gothroughFilesData = db.getCollection("gothroughFilesData");
    
        if (gothroughFilesData === null) {
            gothroughFilesData = db.addCollection("gothroughFilesData");
    
            this.main() // We execute the main when there is no database (Like at the first launch of the software or when database is deleted aso..)
        }else{ // Database already created
            // Here we put code when the database is already created (like look if the database is up to date ? .. This part will be coded at a time..)
    
            // Check if the folder we have to watch/index is the same as we have into the database, if not we call again if not all is ok
            if(LAST_FOLDER_WATCHED_AND_INDEXED.indexOf(FOLDER_TO_WATCH_AND_TO_INDEX) === -1){
                console.log("Not same folders, we go to main again ! ");
                this.main();
            }else{
                console.log("Same folders");
            }
        }
    }
    
    main() {
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
                    if(this.fileContentIsIndexableForExtension(actualFileName)) {
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
                    if(this.fileContentIsIndexableForExtension(actualFileName)) {
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
    fileContentIsIndexableForExtension(fileNameWithExtension){
        if(fileNameWithExtension.length === 0)
            return false;
    
        let fileExtensionRegex = new RegExp('.*\\.(\\w+)', 'i');
    
        let extension = fileNameWithExtension.match(fileExtensionRegex);
    
    
        if(extension == null)
            return false;
    
        extension = extension[1];
    
        if(this.fileNameWithExtensionIsInList(extension))
            return true;
    
        return false;
    }
    
    
    fileNameWithExtensionIsInList(extension){
        var acceptedExtensions = ["php", "md", "txt", "vsdx", "css", "html", "rtf", "js", "xml", "json", "log", "ipt", "odt", "wks", "wpd", "sql"];
    
        if(acceptedExtensions.indexOf(extension) >= 0)
            return true;
    
        return false;
    }
    
    loading(){
        let that = this;
        setTimeout(()=>{
            if(that.state.path==null){
                that.setState({view: "path"})
            }else{
                that.setState({view: "main"})
            }
        },1000)
    }
    setPath($path){
        console.log($path)
        this.setState({path:$path});
        this.setState({view: "main"})
    }

    render() {
        let view = this.state.view;
        switch(view){
            case "splash":
                return (
                    <SplashScreen/>
                );
            case "main":
                return (
                    <Main path={this.state.path}/>
                );
            case "path":
                return (
                    <Path setPath={this.setPath}/>
                );
            default:
                break;
        }
    }
}

export default App;
