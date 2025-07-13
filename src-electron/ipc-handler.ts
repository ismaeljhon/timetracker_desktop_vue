import { app, ipcMain } from 'electron';
import { date, format } from 'quasar';
import fs from 'fs';
import screenshot from 'screenshot-desktop';
import path from 'path';
import Store from 'electron-store';
import ZohoProjectsService from './services/ZohoProjectsService';
import ZohoProjectTasksService from './services/ZohoProjectTasksService';
import ZohoCatalystFilesService from './services/ZohoCatalystFilesService';
import AuthKeyStorageService from './services/AuthKeyStorageService';
import type { CurrentUser } from './types/auth.type';

import { config } from 'dotenv';
config();

export const loadIpcHandlers = () => {
  // load Authentication keys from HomePath here
  AuthKeyStorageService.setAuthKeys();

  const store = new Store<{ latestScreenshot: string; currentUser: CurrentUser }>();

  ipcMain.handle('get-current-user', () => {
    return store.get('currentUser');
  });

  ipcMain.handle('take-screenshot', async () => {
    const { capitalize } = format;
    const ownerName = 'demo user';
    const timeStamp = Date.now();
    const screenshotFile = `${capitalize(ownerName).replaceAll(' ', '-')}-${date.formatDate(timeStamp, 'DDMMYYYY-hhmmss')}.jpg`;
    const imgPath = path.join(app.getPath('pictures'), screenshotFile);

    await screenshot({ filename: imgPath });
    store.set('latestScreenshot', imgPath);

    await new ZohoCatalystFilesService().uploadScreenshot();

    return imgPath;
  });

  ipcMain.handle('get-latest-screenshot', () => {
    const imgPath = store.get('latestScreenshot');
    const buffer = fs.readFileSync(imgPath);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  });

  ipcMain.handle('get-projects', () => {
    return new ZohoProjectsService().getList();
  });

  ipcMain.handle('get-tasks-by-project', (event, args: { projectId: number | string }) => {
    return new ZohoProjectTasksService(args.projectId).getList();
  });
};
