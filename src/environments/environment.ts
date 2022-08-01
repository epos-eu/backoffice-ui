// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server: 'http://localhost:4200',
  apiBaseUrl: 'https://epos-ics-c-staging.brgm-rec.fr:443/api/backoffice-service/v1',
  apiBaseLoginUrl: 'https://ics-c.epos-ip.org/demo/k8s-epos-deploy/backoffice-test-env/api/backoffice/v1/index',
  useLiveApi: true,
  apiMockUrl: 'http://localhost:4200/assets/data',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
