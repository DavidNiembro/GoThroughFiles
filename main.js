"use strict";
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


let mainWindow;

require("./function.js")

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

app.on("ready", function() {
    
    mainWindow = new BrowserWindow({ width: 900, height: 600, minHeight: 800, minWidth: 900,frame: false });
    /*
        const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, "/../build/index.html"),
            protocol: "file:",
            slashes: true
        });
    */
    setTimeout(mainWindows, 300);

    function mainWindows() {
        mainWindow.loadURL(startUrl);
        //mainWindow.loadURL("http://127.0.0.1:8088/search");
    }

   // mainWindow.webContents.openDevTools();

    mainWindow.on("closed", function() {
        mainWindow = null;
    });

    app.on("activate", function() {
        if (mainWindow === null) {
            createWindow();
        }
    });

    
});
