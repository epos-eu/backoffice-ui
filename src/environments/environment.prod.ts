import { LogLevel } from 'src/utility/enums/log.enum';

export const environment = {
  production: true,
  server: 'http://gateway:5000',
  //server: '/epos-back-office/',
  apiBaseUrl: 'http://gateway:5000/api/v1',
  useLiveApi: true,
  apiMockUrl: 'http://localhost:4200/assets/data',
  logLevel: LogLevel.info,
};
