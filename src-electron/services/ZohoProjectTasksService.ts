import type { ProjectTask } from 'src/types/zoho-rest.type';
import ZohoPortalRestApiService from './base/ZohoPortalsService';

export default class ZohoProjectTasksService extends ZohoPortalRestApiService {
  constructor(projectId: string | number) {
    super(`/projects/${projectId}/tasks`);
  }

  async getList(): Promise<ProjectTask[]> {
    return super
      .request({
        url: '/',
      })
      .then((res) => res.data.tasks);
  }
}
