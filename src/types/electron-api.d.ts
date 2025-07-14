import type { CurrentUser } from 'app/src-electron/types/auth.type';
import type { Project, ProjectTask, ZohoTimelogDTO, ZohoTimelogSummary } from './zoho-rest.type';

export {};

declare global {
  interface Window {
    electronAPI: {
      takeScreenshot: () => Promise<string>;
      getLatestScreenshot: () => Promise<string>;
      getProjects: () => Promise<Project[]>;
      getProjectTasks: (projectId: string | number) => Promise<ProjectTask[]>;
      getTimelogSummary: () => Promise<ZohoTimelogSummary>;
      addTimelogPerTask: (args: ZohoTimelogDTO) => Promise<[]>;
    };
    authApi: {
      getCurrentUser: () => Promise<CurrentUser>;
      saveToken: (token: string) => Promise<void>;
      getToken: () => Promise<string | undefined>;
      clearToken: () => Promise<void>;
    };
  }
}
