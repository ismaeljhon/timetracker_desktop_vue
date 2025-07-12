import type { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import axios from 'axios';

interface ApiServiceInstanceParams {
  baseURL: string;
  headers?: Partial<AxiosRequestHeaders>;
  url?: string;
}

export default class RestApiService {
  private axiosInstance: AxiosInstance;
  constructor(apiServiceInstanceParams: ApiServiceInstanceParams) {
    this.axiosInstance = axios.create(apiServiceInstanceParams);
  }

  async request(axiosRequestProps: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.axiosInstance.request(axiosRequestProps);
  }

  getCurrentInstance() {
    return this.axiosInstance;
  }
}
