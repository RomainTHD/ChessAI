const path = require("path");

const {app, BrowserWindow} = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
    // Create the browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Load the index.html of the app
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? "http://localhost:3001"
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
