import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from 'src/components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { SnackbarService } from 'src/services/snackbar.service';
import { DialogComponent } from 'src/components/dialogs/dialog/dialog.component';
import { PortalModule } from '@angular/cdk/portal';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { AngularMaterialModule } from './angular-material.module';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { aaaiServiceProvider } from 'src/aaai/aaai.service';
import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMAT } from 'src/utility/config/date';

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    PortalModule,
    AngularMaterialModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MatSnackBarRef,
      useValue: {},
    },
    ApiService,
    DialogService,
    SnackbarService,
    aaaiServiceProvider,
    { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // static forRoot(): ModuleWithProviders<AppModule> {
  //   return {
  //     ngModule: AppModule,
  //     providers: [aaaiServiceProvider],
  //   };
  // }
}
