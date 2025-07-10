import { app, ipcMain } from 'electron';
import screenshot from 'screenshot-desktop';
import path from 'path';
import ZohoProjectsService from './services/ZohoProjectsService';
import ZohoProjectTasksService from './services/ZohoProjectTasksService';

export const loadIpcHandlers = () => {
  ipcMain.handle('take-screenshot', async () => {
    const imgPath = path.join(app.getPath('pictures'), `screenshot-${Date.now()}.jpg`);
    await screenshot({ filename: imgPath });
    return imgPath;
  });

  ipcMain.handle('get-projects', async () => {
    return new ZohoProjectsService().getList();
  });

  ipcMain.handle('get-tasks-by-project', (event, args: { projectId: number | string }) => {
    return new ZohoProjectTasksService(args.projectId).getList();
  });
};
