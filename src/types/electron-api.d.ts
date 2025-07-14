import type { CurrentUser } from 'app/src-electron/types/auth.type';
import type { Project, ProjectTask, ZohoTimesheet } from './zoho-rest.type';

export {};

declare global {
  interface Window {
    electronAPI: {
      takeScreenshot: () => Promise<string>;
      getLatestScreenshot: () => Promise<string>;
      getProjects: () => Promise<Project[]>;
      getProjectTasks: (projectId: string | number) => Promise<ProjectTask[]>;
      getTimelogSummary: () => Promise<{
        weeklyTimesheet: ZohoTimesheet;
        dailyTimesheet: ZohoTimesheet;
      }>;
    };
    authApi: {
      getCurrentUser: () => Promise<CurrentUser>;
      saveToken: (token: string) => Promise<void>;
      getToken: () => Promise<string | undefined>;
      clearToken: () => Promise<void>;
    };
  }
}
