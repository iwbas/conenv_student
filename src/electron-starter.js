const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const exec = require("child_process").exec;

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
}

let win;
let closingByPass = false;

function createWindow() {
  win = new BrowserWindow({
    alwaysOnTop: true, // enable always on top to prevent other windows from appearing above it
    kiosk: true, // enable kiosk mode, makes it full screen and what not
    skipTaskbar: true,
    webPreferences: {
      disableDialogs: true,
      nodeIntegration: true,
      nativeWindowOpen: true,
      enableRemoteModule: true,
    },
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  // win.removeMenu();

  // win.loadFile('index.html')
  win.loadURL(startUrl);

  win.on("closed", () => {
    win = null;
  });

  win.on("close", (event) => {
    if (closingByPass) {
      execute("explorer.exe", (output) => {
        console.log(output);
      });
    } else {
      event.preventDefault(); // stop the browser window from being closed
    }
  });
}

app.on("ready", (event) => {
  console.log("ready");

  // call the function
  // execute("taskkill /f /im explorer.exe", (output) => {
  //   console.log(output);
  // });

  createWindow();
});

app.on("before-quit", (event) => {
  console.log("before-quit");
  // event.preventDefault(); // prevent the process from ending
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// helper to prevent the app from loosing focus
app.on("browser-window-blur", (event, bw) => {
  bw.restore();
  bw.focus();
});

ipcMain.on("close-by-pass", (evt, arg) => {
  closingByPass = true;
  app.quit();
});
