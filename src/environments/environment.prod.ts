import { LogLevel } from 'src/utility/enums/log.enum';

export const environment = {
  production: true,
  //server: '/epos-back-office/',
  apiBaseUrl: window.location.href+'/api/v1',
  useLiveApi: true,
  apiMockUrl: window.location.href+'/assets/data',
  logLevel: LogLevel.info,
};
