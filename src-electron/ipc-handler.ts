import { app, ipcMain } from 'electron';
import { date, format } from 'quasar';
import fs from 'fs';
import screenshot from 'screenshot-desktop';
import path from 'path';
import Store from 'electron-store';
import ZohoProjectsService from './services/ZohoProjectsService';
import ZohoProjectTasksService from './services/ZohoProjectTasksService';
import AuthKeyStorageService from './services/AuthKeyStorageService';
import type { CurrentUser } from './types/auth.type';

import { config } from 'dotenv';
import ZohoTimesheetsService from './services/ZohoTimesheetsService';
import type { PortalUser, ZohoTimelogDTO } from 'src/types/zoho-rest.type';
import ZohoPortalService from './services/base/ZohoPortalsService';
import ZohoWorkdriveApiService from './services/ZohoWorkdriveApiService';
config();

export const loadIpcHandlers = () => {
  // load Authentication keys from HomePath here
  AuthKeyStorageService.setAuthKeys();

  const store = new Store<{
    latestScreenshot: string;
    currentUser: CurrentUser;
    portalUsers: PortalUser[];
  }>();

  ipcMain.handle('get-portal-users', async (event, args: { fetchFromApi?: boolean }) => {
    console.log('args.fetchFromApi', args.fetchFromApi);
    if (args.fetchFromApi) {
      const portalUsers = await new ZohoPortalService()
        .getUsers()
        .catch(() => console.log('Error IPC: fetching portal users'));

      store.set('portalUsers', portalUsers);
    }

    return store.get('portalUsers');
  });

  ipcMain.handle('take-screenshot', async () => {
    // AuthKeyStorageService.clearAccessToken();
    const currentUser = store.get('currentUser');

    const { capitalize } = format;
    const ownerName = currentUser.name;
    const timeStamp = Date.now();
    const screenshotFile = `${capitalize(ownerName).replaceAll(' ', '-')}-${date.formatDate(timeStamp, 'DDMMYYYY-hhmmss')}.jpg`;
    const imgPath = path.join(app.getPath('pictures'), screenshotFile);

    await screenshot({ filename: imgPath });
    store.set('latestScreenshot', imgPath);

    new ZohoWorkdriveApiService()
      .uploadScreenshot()
      .catch((err) => console.log('Error IPC: uploading screenshot', err));

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

  ipcMain.handle(
    'get-subtasks',
    (event, args: { projectId: number | string; taskId: number | string }) => {
      return new ZohoProjectTasksService(args.projectId).getSubTasks(args.taskId);
    },
  );

  ipcMain.handle('get-timelog-summary', async () => {
    const daily = await new ZohoTimesheetsService().getTimesheet('day');
    const weekly = await new ZohoTimesheetsService().getTimesheet('week');
    return {
      daily,
      weekly,
    };
  });

  ipcMain.handle(
    'add-time-log-per-task',
    async (event, args: { zohoTimelogDTO: ZohoTimelogDTO }) => {
      const { projectId, taskId, params } = args.zohoTimelogDTO;
      return new ZohoProjectTasksService(projectId).addTimelog({ taskId, params });
    },
  );

  ipcMain.handle('auth:isAuthenticated', () => {
    const currentUser = store.get('currentUser');
    return !!currentUser;
  });
  ipcMain.handle('auth:set-current-user', (event, args: { currentUser: PortalUser }) => {
    store.set('currentUser', args.currentUser);
  });
  ipcMain.handle('auth:get-current-user', () => {
    return store.get('currentUser');
  });
  ipcMain.handle('auth:sign-out', () => {
    store.delete('currentUser');
  });
};
