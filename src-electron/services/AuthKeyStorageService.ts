import type { AuthRefreshToken } from '../types/auth.type';
import Store from 'electron-store';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

const store = new Store<AuthRefreshToken>();

const AuthKeyStorageService = {
  setAuthKeys(): void {
    const homePath = app.getPath('home');
    const filePath = path.join(homePath, 'authkeys.json');

    if (!fs.existsSync(filePath)) {
      console.error('JSON File not found');
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const authKeys: AuthRefreshToken = JSON.parse(content);

    store.set('client_id', authKeys.client_id);
    store.set('client_secret', authKeys.client_secret);
    store.set('refresh_token', authKeys.refresh_token);
  },
  getAuthKeys(): AuthRefreshToken {
    const client_id = store.get('client_id');
    const client_secret = store.get('client_secret');
    const refresh_token = store.get('refresh_token');

    return {
      client_id,
      client_secret,
      refresh_token,
    };
  },
  getAccessToken(): string | undefined {
    return store.get('access_token');
  },
  setAccessToken(access_token: string): void {
    store.set('access_token', access_token);
  },
};

export default AuthKeyStorageService;
