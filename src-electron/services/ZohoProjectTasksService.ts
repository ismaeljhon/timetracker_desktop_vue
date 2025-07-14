import type { ProjectTask, ZohoTimelogDTO } from 'src/types/zoho-rest.type';
import ZohoPortalRestApiService from './base/ZohoPortalsService';
import queryString from 'querystring';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { getCurrentDateInUTC } from 'src/shared/utils';
dayjs.extend(utc);

export default class ZohoProjectTasksService extends ZohoPortalRestApiService {
  private projectId: string | number;
  constructor(projectId: string | number) {
    super();
    this.projectId = projectId;
  }

  async getList(): Promise<ProjectTask[]> {
    return super
      .getInstance()
      .get(`/projects/${this.projectId}/tasks/`)
      .then((res) => res.data.tasks);
  }

  async addTimelog(args: Omit<ZohoTimelogDTO, 'projectId'>) {
    let { params } = args;
    const { taskId } = args;
    const date = getCurrentDateInUTC();
    const bill_status = 'Billable';

    if (!params.date) {
      params = {
        ...params,
        date,
      };
    }

    if (!params.bill_status) {
      params = {
        ...params,
        bill_status,
      };
    }

    return super
      .getInstance()
      .post(`/projects/${this.projectId}/tasks/${taskId}/logs/?${queryString.stringify(params)}`)
      .catch(() => console.error('Error on adding timelog'));
  }
}
