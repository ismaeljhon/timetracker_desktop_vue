import type { Project } from 'src/types/zoho-rest.type';
import ZohoCatalystApiService from './base/ZohoCatalystApiService';
import fs from 'fs';
import path from 'path';
import Store from 'electron-store';
import FormData from 'form-data';

export default class ZohoCatalystFilesService extends ZohoCatalystApiService {
  constructor() {
    const folderId = '17014000000021066';
    super(`/folder/${folderId}`);
  }

  async getList(): Promise<Project[]> {
    return super.request().then((res) => res.data.data);
  }

  async uploadScreenshot() {
    const store = new Store<{ latestScreenshot: string }>();
    const filePath = store.get('latestScreenshot');
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);

    const form = new FormData();
    form.append('code', fileStream, fileName);
    form.append('file_name', fileName);

    return super.request({
      method: 'POST',
      url: '/file',
      data: form,
    });
  }
}
