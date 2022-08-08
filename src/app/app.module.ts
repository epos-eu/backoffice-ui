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
