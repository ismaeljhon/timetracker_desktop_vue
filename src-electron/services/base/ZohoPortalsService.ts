import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import RestApiService from './RestApiService';

export default class ZohoPortalRestApiService extends RestApiService {
  constructor(prefix: string = '/') {
    const portalId = '';
    const accessToken = '';

    super({
      baseURL: `https://projectsapi.zoho.com/restapi/portal/${portalId}${prefix}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  override async request(axiosRequestProps?: AxiosRequestConfig): Promise<AxiosResponse> {
    return super.request({ ...axiosRequestProps }).then((res) => res);
  }
}
