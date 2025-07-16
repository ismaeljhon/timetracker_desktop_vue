import fs from 'fs';
import path from 'path';
import Store from 'electron-store';
import FormData from 'form-data';
import ZohoRestApiService from './base/ZohoRestApiService';

export default class ZohoWorkdriveApiService extends ZohoRestApiService {
  constructor() {
    super(`https://www.zohoapis.com/workdrive/api/v1`);
  }

  async uploadScreenshot() {
    const folderId = process.env.ZOHO_WORKDRIVE_FOLDER_ID;

    const store = new Store<{ latestScreenshot: string }>();
    const filePath = store.get('latestScreenshot');
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);

    const form = new FormData();
    form.append('parent_id', folderId);
    form.append('content', fileStream, fileName);
    form.append('filename', fileName);

    return super.getInstance().post(`/upload`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
