export default {};

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
