import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import Store from 'electron-store';
import ZohoAuthenticationService from '../ZohoAuthenticationService';

const store = new Store<{ access_token: string }>();
export default class {
  private axiosInstance: AxiosInstance;
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });

    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const accessToken = store.get('access_token');
      console.log(accessToken);
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Refresh token on 401
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error);
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Refresh the token
            const zohoAuthenticationService = new ZohoAuthenticationService();
            await zohoAuthenticationService.generateAccessToken().catch((e) => console.log(e));

            const newAccessToken = zohoAuthenticationService.getAccessToken();

            // Retry the original request
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return this.axiosInstance(originalRequest);
          } catch (err) {
            // Optional: clear tokens and handle logout
            return Promise.reject(new Error('Err: ', err || ''));
          }
        }

        return Promise.reject(new Error('Error: ', error || ''));
      },
    );
  }

  getInstance() {
    return this.axiosInstance;
  }
}
