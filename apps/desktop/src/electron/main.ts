import "dotenv/config";
import { app, BrowserWindow, Tray } from "electron";
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
};

app.whenReady().then(() => {
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
