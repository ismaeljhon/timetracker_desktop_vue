export default {};

export type PortalUser = {
  role: string;
  profile_type: string | number;
  active: boolean;
  currency_code: string;
  cost_per_hour: string | number;
  role_name: string;
  zpuid: string | number;
  profile_name: string;
  role_id: string | number;
  profile_id: string | number;
  name: string;
  id: string | number;
  invoice: string | number;
  email: string;
  is_resource: boolean;
};

export type Project = {
  id: number;
  id_string: string;
  status: string;
  name: string;
};

type ProjectTaskStatus = {
  name: string;
  id: string | number;
  type: string;
  color_code: string;
};
export type ProjectTask = Omit<Project, 'status'> & {
  status: ProjectTaskStatus;
};
export type ProjectSubTask = ProjectTask;

export type ZohoTimelogSummary = {
  daily: ZohoTimesheet;
  weekly: ZohoTimesheet;
};
export type ZohoTimesheet = {
  date: Array<string>;
  role: string;
  non_billable_hours: string;
  billable_hours: string;
  grandtotal: string;
};

export type ZohoTimelogDTO = {
  projectId: string | number;
  taskId: string | number;
  params: {
    date?: string;
    owner?: string;
    bill_status?: string;
    hours: string;
    notes?: string;
    cost_per_hour?: number;
  };
};
