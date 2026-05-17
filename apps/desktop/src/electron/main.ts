import "dotenv/config";
import { app, BrowserWindow } from "electron";
import { createTray } from "./tray.js";
import path from "path";

const dev = process.env.NODE_ENV === "development";

const createWindow = () => {
  const win = new BrowserWindow({
    title: "Contextly",
    icon: dev ? path.join(app.getAppPath(), "public", "icon.png") : undefined,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), "dist-electron", "preload.cjs"),
    },
  });

  if (dev) {
    void win.loadURL(process.env.LOCAL_URL!);
  } else {
    void win.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
  }

  createTray(win);
  handleCloseEvents(win);
};

app.whenReady().then(() => {
  createWindow();
});

const handleCloseEvents = (mainWindow: BrowserWindow) => {
  let willClose = false;

  mainWindow.on("show", () => {
    willClose = false;
  });

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });
};
