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

    setTimeout(mainWindows, 300);

    function mainWindows() {
        mainWindow.loadURL(startUrl);
        //mainWindow.loadURL("http://127.0.0.1:8088/search");
    }

    //mainWindow.webContents.openDevTools();

    mainWindow.on("closed", function() {
        mainWindow = null;
    });

    app.on("activate", function() {
        if (mainWindow === null) {
            createWindow();
        }
    });

    
});
