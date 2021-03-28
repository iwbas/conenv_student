const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const url = require("url");
const path = require("path");
const execSync = require("child_process").execSync;
const exec = require("child_process").exec;

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
}

let win = null;
let closingByPass = false;

/* --- Защита от нескольких инстансов --- */
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  console.log("single instance lock");
  app.quit();
  return;
}

app.on("second-instance", (event, commandLine, workingDirectory) => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

/* --- Создание окна --- */
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

  win.loadURL(startUrl);

  win.on("closed", () => {
    win = null;
  });

  win.on("close", (event) => {
    console.log(closingByPass);
    if (!closingByPass) {
      event.preventDefault(); // stop the browser window from being closed
    } else {
      if (process.platform === "win32") {
        exec("explorer.exe", (error, stdout, stderr) => {
          console.log(stdout);
        });
      }
    }
  });

  console.log('alttabreg');
}

/* --- Запуск приложения --- */
app.on("ready", (event) => {
  console.log("ready");

  if (process.platform === "win32") {
    execSync("taskkill /f /im explorer.exe", (error, stdout, stderr) => {
      console.log(stdout);
    });
  }

  createWindow();

  console.log('reg');
  
  registered = false;

  while (!registered) {
    registered = globalShortcut.register("Alt+Tab", () => {
      console.log("Alt+Tab");
    });
    console.log('регистрация');
  }
});

/* MacOs - пока оставил */
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

/* --- [D] Возврат фокуса --- */
app.on("browser-window-blur", (event, bw) => {
  bw.restore();
  bw.focus();
});

/* --- [D] Выход по паролю --- */
ipcMain.on("close-by-pass", (evt, arg) => {
  closingByPass = true;
  app.quit();
});
