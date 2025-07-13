import ZohoRestApiService from './ZohoRestApiService';

export default class ZohoPortalService extends ZohoRestApiService {
  constructor(prefix: string = '') {
    const portalId = '';
    super(`https://projectsapi.zoho.com/restapi/portal/${portalId}${prefix}`);
  }
}
