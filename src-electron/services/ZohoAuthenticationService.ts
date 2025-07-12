import RestApiService from './base/RestApiService';
import { config } from 'dotenv';
import AuthKeyStorageService from './AuthKeyStorageService';
import queryString from 'querystring';
import axios from 'axios';

export default class ZohoAuthenticationService {
  private apiService: RestApiService;
  constructor() {
    config();

    this.apiService = new RestApiService({
      baseURL: 'https://accounts.zoho.com/oauth/v2/token',
    });
  }

  async generateAccessToken() {
    const { refresh_token, client_id, client_secret } = AuthKeyStorageService.getAuthKeys();
    const grant_type = 'refresh_token';

    const params = {
      refresh_token,
      client_id,
      client_secret,
      grant_type,
    };

    await axios
      .post(`https://accounts.zoho.com/oauth/v2/token?${queryString.stringify(params)}`)
      .then((res) => {
        AuthKeyStorageService.setAccessToken(res.data.access_token);
        console.log('access', res.data.access_token);
      });

    // await this.apiService
    //   .request({
    //     method: 'POST',
    //     url: `?${queryString.stringify(params)}`,
    //   })
    //   .then((res) => {
    //     AuthKeyStorageService.setAccessToken(res.data.access_token);
    //   });
  }

  getAccessToken() {
    return AuthKeyStorageService.getAccessToken();
  }
}
