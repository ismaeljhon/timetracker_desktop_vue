import type { Project } from 'src/types/zoho-rest.type';
import ZohoPortals from './base/ZohoPortalsService';

export default class ZohoProjectsService extends ZohoPortals {
  constructor() {
    super('/projects/');
  }

  async getList(): Promise<Project[]> {
    return super.request().then((res) => res.data.projects);
  }
}
