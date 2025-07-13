import type { ZohoTimesheet } from 'src/types/zoho-rest.type';
import ZohoPortalService from './base/ZohoPortalsService';
import { date } from 'quasar';

export default class ZohoTimesheetsService extends ZohoPortalService {
  constructor() {
    super();
  }

  async getWeeklyTimesheet(): Promise<ZohoTimesheet> {
    return super
      .getInstance()
      .get('/logs', {
        params: {
          users_list: '',
          view_type: 'week',
          date: date.formatDate(Date.now(), 'MM-DD-YYYY'),
          bill_status: 'All',
          component_type: 'task',
        },
      })
      .then((res) => res.data.timelogs);
  }
}
