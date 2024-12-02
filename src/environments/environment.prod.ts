import { LogLevel } from 'src/utility/enums/log.enum';

export const environment = {
  production: true,
  //server: '/epos-back-office/',
  apiBaseUrl: window.location.href+'/api/v1',
  useLiveApi: true,
  apiMockUrl: 'http://localhost:4200/assets/data',
  logLevel: LogLevel.info,
};
