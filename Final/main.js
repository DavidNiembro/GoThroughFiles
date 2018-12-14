"use strict";
//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}
const electron = require("electron");
var path = require("path");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


let mainWindow;

require("./function.js")



app.on("ready", function() {

    // Config of the application window for Windows
    mainWindow = new BrowserWindow({ width: 900, height: 600, minHeight: 800, minWidth: 900,frame: false, backgroundColor: '#070b0e',show: false, center: true,icon: path.join(__dirname, "src/assets/logo/gothroughfiles.ico"),  fullscreenWindowTitle: true, defaultFontFamily: "fantasy", title: "GoThroughFiles", webPreferences: {
            webSecurity: false
        }, node: {
            __dirname: false,
            __filename: false
        } });
    // For MacOS
    if (process.platform === 'darwin') {
        mainWindow = new BrowserWindow({ width: 900, height: 600, minHeight: 800, minWidth: 900,frame: false, title:"GoThroughFiles", icon: path.join(__dirname, "src/assets/logo/gothroughfiles.icns"), backgroundColor: "#070b0e", type: "textured" });
    }
    // For Linux
    if (process.platform === 'linux') {
        mainWindow = new BrowserWindow({ width: 900, height: 600, minHeight: 800, minWidth: 900,frame: false, title:"GoThroughFiles", icon: path.join(__dirname, "src/assets/logo/gothroughfiles64x64.png"), backgroundColor: "#070b0e", type: "textured" });
    }

    // Set a waiting time before electron is launched
    setTimeout(mainWindows, 3000);

    // Update of the title of the application
    mainWindow.on('page-title-updated', (evt) => {
        evt.preventDefault();
    });


    // Load our main files for Electron to launch properly
    function mainWindows() {
        mainWindow.loadURL('file://' + __dirname + '/build/index.html');
    }

    // Function that diminishes the window to the task bar
    mainWindow.on("closed", function() {
        mainWindow = null;
    });

    // Launch the Electron app
    app.on("activate", function() {
        if (mainWindow === null) {
            createWindow();
        }
    });

    // Kill the processes on Windows
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });

    // If all ready, launch electron
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });



});