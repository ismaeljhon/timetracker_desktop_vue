import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import RestApiService from './RestApiService';

export default class ZohoCatalystApiService extends RestApiService {
  constructor(prefix: string = '/') {
    const projectId = '';
    const accessToken = '';

    super({
      baseURL: `https://api.catalyst.zoho.com/baas/v1/project/${projectId}${prefix}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  override async request(axiosRequestProps?: AxiosRequestConfig): Promise<AxiosResponse> {
    return super.request({ ...axiosRequestProps }).then((res) => res);
  }
}
