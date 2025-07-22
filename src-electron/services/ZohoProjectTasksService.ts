import type { ProjectSubTask, ProjectTask, ZohoTimelogDTO } from 'src/types/zoho-rest.type';
import ZohoPortalRestApiService from './base/ZohoPortalsService';
import queryString from 'querystring';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import Store from 'electron-store';
import { getCurrentDateInUTC } from 'src/shared/utils';
import type { CurrentUser } from '../types/auth.type';
dayjs.extend(utc);

export default class ZohoProjectTasksService extends ZohoPortalRestApiService {
  private projectId: string | number;
  private allowedStatus = ['Open', 'In Progress', 'Waiting for Client'];
  constructor(projectId: string | number) {
    super();
    this.projectId = projectId;
  }

  async getList(): Promise<ProjectTask[]> {
    const store = new Store<{ currentUser: CurrentUser }>();
    const currentUser = store.get('currentUser');
    const owner = currentUser.id;

    const params = {
      owner,
    };

    return super
      .getInstance()
      .get(`/projects/${this.projectId}/tasks/?${queryString.stringify(params)}`)
      .then((res) =>
        res.data.tasks.filter((task: ProjectTask) => this.allowedStatus.includes(task.status.name)),
      );
  }

  async getSubTasks(taskId: string | number): Promise<ProjectSubTask[]> {
    return super
      .getInstance()
      .get(`/projects/${this.projectId}/tasks/${taskId}/subtasks/`)
      .then((res) =>
        res.data.tasks.filter((subTask: ProjectSubTask) =>
          this.allowedStatus.includes(subTask.status.name),
        ),
      );
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
