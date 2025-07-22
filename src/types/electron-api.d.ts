import type { CurrentUser } from 'app/src-electron/types/auth.type';
import type {
  PortalUser,
  Project,
  ProjectSubTask,
  ProjectTask,
  ZohoTimelogDTO,
  ZohoTimelogSummary,
} from './zoho-rest.type';

export {};

declare global {
  interface Window {
    electronAPI: {
      takeScreenshot: () => Promise<string>;
      getLatestScreenshot: () => Promise<string>;
      getProjects: () => Promise<Project[]>;
      getProjectTasks: (projectId: string | number) => Promise<ProjectTask[]>;
      getSubTasks: (
        projectId: string | number,
        taskId: string | number,
      ) => Promise<ProjectSubTask[]>;
      getTimelogSummary: () => Promise<ZohoTimelogSummary>;
      addTimelogPerTask: (args: ZohoTimelogDTO) => Promise<[]>;
      getPortalUsers: ({ fetchFromApi: boolean }) => Promise<PortalUser[]>;
    };
    authApi: {
      getCurrentUser: () => Promise<CurrentUser>;
      saveToken: (token: string) => Promise<void>;
      getToken: () => Promise<string | undefined>;
      clearToken: () => Promise<void>;
      setCurrentUser: (currentUser: PortalUser) => Promise<void>;
      isAuthenticated: () => Promise<boolean>;
      signOut: () => Promise<void>;
    };
  }
}
