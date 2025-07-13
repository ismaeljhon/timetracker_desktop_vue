export type AuthRefreshToken = {
  refresh_token: string;
  client_id: string;
  client_secret: string;
  access_token?: string;
};

export type CurrentUser = {
  role: string;
  active: boolean;
  role_name: string;
  zpuid: string | number;
  profile_name: string;
  profile_id: string | number;
  name: string;
  id: string | number;
  email: string;
};
