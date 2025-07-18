// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LogLevel } from 'src/utility/enums/log.enum';

export const environment = {
  production: false,
  server: 'http://localhost:4200',
  apiBaseUrl: 'http://localhost:4200/api',
  useLiveApi: true,
  apiMockUrl: 'http://localhost:4200/assets/data',
  logLevel: LogLevel.debug,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
