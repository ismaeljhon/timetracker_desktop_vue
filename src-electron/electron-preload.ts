/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */

import { contextBridge, ipcRenderer } from 'electron';
import type {
  Project,
  ProjectTask,
  ZohoTimelogDTO,
  ZohoTimelogSummary,
} from 'src/types/zoho-rest.type';

contextBridge.exposeInMainWorld('electronAPI', {
  takeScreenshot: (): Promise<string> => ipcRenderer.invoke('take-screenshot'),
  getLatestScreenshot: (): Promise<string> => ipcRenderer.invoke('get-latest-screenshot'),
  getProjects: (): Promise<Project[]> => ipcRenderer.invoke('get-projects'),
  getProjectTasks: (projectId: string | number): Promise<ProjectTask[]> =>
    ipcRenderer.invoke('get-tasks-by-project', { projectId }),
  getTimelogSummary: (): Promise<ZohoTimelogSummary> => ipcRenderer.invoke('get-timelog-summary'),
  addTimelogPerTask: (zohoTimelogDTO: ZohoTimelogDTO): Promise<[]> =>
    ipcRenderer.invoke('add-time-log-per-task', { zohoTimelogDTO }),
});

contextBridge.exposeInMainWorld('authApi', {
  saveToken: (token: string) => ipcRenderer.invoke('auth:save-token', token),
  getToken: (): Promise<string | undefined> => ipcRenderer.invoke('auth:get-token'),
  clearToken: () => ipcRenderer.invoke('auth:clear-token'),
});
