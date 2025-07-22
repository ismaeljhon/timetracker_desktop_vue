import type { PortalUser } from 'src/types/zoho-rest.type';

export type AuthRefreshToken = {
  refresh_token: string;
  client_id: string;
  client_secret: string;
  access_token?: string;
};

export type CurrentUser = PortalUser;
