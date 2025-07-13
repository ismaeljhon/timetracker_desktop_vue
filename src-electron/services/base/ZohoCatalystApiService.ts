import ZohoRestApiService from './ZohoRestApiService';

export default class ZohoCatalystApiService extends ZohoRestApiService {
  constructor(prefix: string = '/') {
    const projectId = '';

    super(`https://api.catalyst.zoho.com/baas/v1/project/${projectId}${prefix}`);
  }
}
