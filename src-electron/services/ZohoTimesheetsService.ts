import type { PortalUser, ZohoTimesheet } from 'src/types/zoho-rest.type';
import ZohoPortalService from './base/ZohoPortalsService';
import { getCurrentDateInUTC } from 'src/shared/utils';
import Store from 'electron-store';
export default class ZohoTimesheetsService extends ZohoPortalService {
  constructor() {
    super();
  }
  async getTimesheet(view_type: string = 'week'): Promise<ZohoTimesheet> {
    const store = new Store<{ currentUser: PortalUser }>();

    const currentUser = store.get('currentUser');

    return super
      .getInstance()
      .get('/logs', {
        params: {
          users_list: currentUser.id,
          view_type,
          date: getCurrentDateInUTC(),
          bill_status: 'All',
          component_type: 'task',
        },
      })
      .then((res) => {
        return res.data.timelogs;
      });
  }
}
