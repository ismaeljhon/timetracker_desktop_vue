import ZohoCatalystApiService from './base/ZohoCatalystApiService';
import fs from 'fs';
import path from 'path';
import Store from 'electron-store';
import FormData from 'form-data';

export default class ZohoCatalystFilesService extends ZohoCatalystApiService {
  constructor() {
    super();
  }

  async uploadScreenshot() {
    const folderId = '17014000000021066';
    const store = new Store<{ latestScreenshot: string }>();
    const filePath = store.get('latestScreenshot');
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);

    const form = new FormData();
    form.append('code', fileStream, fileName);
    form.append('file_name', fileName);

    return super.getInstance().post(`/folder/${folderId}/file`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
