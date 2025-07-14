import type { ZohoTimesheet } from 'src/types/zoho-rest.type';
import ZohoPortalService from './base/ZohoPortalsService';
import { date } from 'quasar';

export default class ZohoTimesheetsService extends ZohoPortalService {
  constructor() {
    super();
  }
  async getTimesheet(view_type: string = 'week'): Promise<ZohoTimesheet> {
    return super
      .getInstance()
      .get('/logs', {
        params: {
          users_list: '',
          view_type,
          date: date.formatDate(Date.now(), 'MM-DD-YYYY'),
          bill_status: 'All',
          component_type: 'task',
        },
      })
      .then((res) => {
        return res.data.timelogs;
      });
  }
}
