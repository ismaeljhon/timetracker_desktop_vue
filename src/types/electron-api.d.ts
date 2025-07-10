import type { Project, ProjectTask } from './zoho-rest.type';

export {};

declare global {
  interface Window {
    electronAPI: {
      takeScreenshot: () => Promise<string>;
      getProjects: () => Promise<Project[]>;
      getProjectTasks: (projectId: string | number) => Promise<ProjectTask[]>;
    };
    authApi: {
      saveToken: (token: string) => Promise<void>;
      getToken: () => Promise<string | undefined>;
      clearToken: () => Promise<void>;
    };
  }
}
