import { LogLevel } from 'src/utility/enums/log.enum';

export const environment = {
  production: true,
  //server: '/epos-back-office/',
  apiBaseUrl: 'https://ics-c.epos-ip.org/development/k8s-epos-deploy/refactoring/api/v1',
  useLiveApi: true,
  apiMockUrl: 'http://localhost:4200/assets/data',
  logLevel: LogLevel.info,
};
