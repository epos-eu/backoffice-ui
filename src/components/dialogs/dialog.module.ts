import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogAddPersonComponent } from './dialog-add-person/dialog-add-person.component';
import { DialogAddContactComponent } from './dialog-add-contact/dialog-add-contact.component';
import { MetadataFileViewComponent } from './metadata-file-view/metadata-file-view.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { RevisionsComponent } from './revisions/revisions.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { MatIconModule } from '@angular/material/icon';
import { ServicesModule } from 'src/services/services.module';
import { WebserviceAddOperationComponent } from './webservice-add-operation/webservice-add-operation.component';
import { DialogAddNewParameterComponent } from './dialog-add-new-parameter/dialog-add-new-parameter.component';
import { ConfirmDialogComponent } from './confirmDialog/confirmDialog.component';
import { DataproductAddDistributionComponent } from './dataproduct-add-distribution/dataproduct-add-distribution.component';
import { DataproductAddWebserviceComponent } from './dataproduct-add-webservice/dataproduct-add-webservice.component';
import { FormatRangePipe } from 'src/pipes/formatRange.pipe';

@NgModule({
  declarations: [
    DialogDeleteComponent,
    DialogAddPersonComponent,
    DialogAddContactComponent,
    MetadataFileViewComponent,
    RevisionsComponent,
    UserPermissionsComponent,
    WebserviceAddOperationComponent,
    DialogAddNewParameterComponent,
    ConfirmDialogComponent,
    DataproductAddDistributionComponent,
    DataproductAddWebserviceComponent,
    FormatRangePipe,
  ],
  imports: [CommonModule, AngularMaterialModule, MatExpansionModule, MatIconModule, ServicesModule],
})
export class DialogModule {}
