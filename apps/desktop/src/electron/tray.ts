import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";

export const createTray = (mainWindow: BrowserWindow) => {
  const tray = new Tray(path.join(app.getAppPath(), "public", "icon.png"));

  tray.on("click", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
      if (app.dock) {
        app.dock.hide();
      }
    } else {
      mainWindow.show();
      if (app.dock) {
        app.dock.show();
      }
    }
  });

  tray.on("right-click", () =>
    tray.popUpContextMenu(
      Menu.buildFromTemplate([
        {
          label: "Quit",
          click: () => app.quit(),
        },
      ]),
    ),
  );
};
