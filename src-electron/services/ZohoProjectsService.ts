import type { Project } from 'src/types/zoho-rest.type';
import ZohoPortalService from './base/ZohoPortalsService';

export default class ZohoProjectsService extends ZohoPortalService {
  constructor() {
    super();
  }

  async getList(): Promise<Project[]> {
    return super
      .getInstance()
      .get('/projects/')
      .then((res) => res.data.projects);
  }
}
