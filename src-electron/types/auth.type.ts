export type AuthRefreshToken = {
  refresh_token: string;
  client_id: string;
  client_secret: string;
  access_token?: string;
};
