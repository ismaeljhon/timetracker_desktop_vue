import { app, ipcMain } from 'electron';
import fs from 'fs';
import screenshot from 'screenshot-desktop';
import path from 'path';
import Store from 'electron-store';
// import ZohoProjectsService from './services/ZohoProjectsService';
import ZohoProjectTasksService from './services/ZohoProjectTasksService';

export const loadIpcHandlers = () => {
  const store = new Store<{ latestScreenshot: string }>();

  ipcMain.handle('take-screenshot', async () => {
    const imgPath = path.join(app.getPath('pictures'), `screenshot-${Date.now()}.jpg`);
    await screenshot({ filename: imgPath });

    store.set('latestScreenshot', imgPath);
    return imgPath;
  });

  ipcMain.handle('get-latest-screenshot', () => {
    const imgPath = store.get('latestScreenshot');
    const buffer = fs.readFileSync(imgPath);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  });

  ipcMain.handle('get-projects', () => {
    return [];
    // return new ZohoProjectsService().getList();
  });

  ipcMain.handle('get-tasks-by-project', (event, args: { projectId: number | string }) => {
    return new ZohoProjectTasksService(args.projectId).getList();
  });
};
