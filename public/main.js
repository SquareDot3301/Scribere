const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
require("electron-remote");
const path = require("path");
const isDev = require("electron-is-dev");
require("update-electron-app")();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./logo.png",
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.on("ready", createWindow);

app.on("activate", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
