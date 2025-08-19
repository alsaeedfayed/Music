import { environment } from '@env/environment.dev';

export class ApiConfig {
  static BASE: string = environment.apiBaseUrl;
  //TODO add features and endpoints as needed
  // static AUTH = {
  //   LOGIN: `${ApiConfig.BASE}/login`,
  //   LOGOUT: `${ApiConfig.BASE}/logout`,
  //   REGISTER: `${ApiConfig.BASE}/register`,
  // }
}
