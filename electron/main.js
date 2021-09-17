require("v8-compile-cache");

const path = require("path");

const dotEnv = require("dotenv");

dotEnv.config();

const {app, BrowserWindow} = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
    // Create the browser window
    const win = new BrowserWindow({
        width: process.env.ELECTRON_INITIAL_WIDTH,
        height: process.env.ELECTRON_INITIAL_HEIGHT,
        webPreferences: {
            sandbox: true,
        },
    });

    // Load the index.html of the app
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? `http://localhost:${process.env.REACT_PORT}`
            : `file://${path.join(__dirname, "../build/index.html")}`,
    ).then();

    // Open the DevTools window
    if (isDev) {
        win.webContents.openDevTools({mode: "detach"});
    }
}

// Called when Electron initialization is finished
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
