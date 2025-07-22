import type { PortalUser } from 'src/types/zoho-rest.type';
import ZohoRestApiService from './ZohoRestApiService';

export default class ZohoPortalService extends ZohoRestApiService {
  constructor(prefix: string = '') {
    const portalId = process.env.ZOHO_PROJECT_PORTAL_ID;
    super(`https://projectsapi.zoho.com/restapi/portal/${portalId}${prefix}`);
  }

  async getUsers(): Promise<PortalUser[]> {
    return super
      .getInstance()
      .get(`/users/`)
      .then((res) => res.data.users);
  }
}
