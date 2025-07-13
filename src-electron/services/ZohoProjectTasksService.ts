import type { ProjectTask } from 'src/types/zoho-rest.type';
import ZohoPortalRestApiService from './base/ZohoPortalsService';

export default class ZohoProjectTasksService extends ZohoPortalRestApiService {
  private projectId: string | number;
  constructor(projectId: string | number) {
    super();
    this.projectId = projectId;
  }

  async getList(): Promise<ProjectTask[]> {
    return super
      .getInstance()
      .get(`/projects/${this.projectId}/tasks/`)
      .then((res) => res.data.tasks);
  }
}
