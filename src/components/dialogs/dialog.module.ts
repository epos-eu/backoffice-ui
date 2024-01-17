import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogAddPersonComponent } from './dialog-add-person/dialog-add-person.component';
import { DialogAddContactComponent } from './dialog-add-contact/dialog-add-contact.component';
import { DialogMetadataFileViewComponent } from './dialog-metadata-file-view/dialog-metadata-file-view.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DialogRevisionsComponent } from './dialog-revisions/dialog-revisions.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DialogUserPermissionsComponent } from './dialog-user-permissions/dialog-user-permissions.component';
import { MatIconModule } from '@angular/material/icon';
import { DialogWebserviceAddOperationComponent } from './dialog-webservice-add-operation/dialog-webservice-add-operation.component';
import { DialogAddNewParameterComponent } from './dialog-add-new-parameter/dialog-add-new-parameter.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { DialogDataproductAddDistributionComponent } from './dialog-dataproduct-add-distribution/dialog-dataproduct-add-distribution.component';
import { DialogDataproductAddWebserviceComponent } from './dialog-dataproduct-add-webservice/dialog-dataproduct-add-webservice.component';
import { FormatRangePipe } from 'src/pipes/formatRange.pipe';
import { DialogNewDataproductComponent } from './dialog-new-dataproduct/dialog-new-dataproduct.component';
import { DialogChangeCommentComponent } from './dialog-change-comment/dialog-change-comment.component';

@NgModule({
  declarations: [
    DialogDeleteComponent,
    DialogAddPersonComponent,
    DialogAddContactComponent,
    DialogMetadataFileViewComponent,
    DialogRevisionsComponent,
    DialogUserPermissionsComponent,
    DialogWebserviceAddOperationComponent,
    DialogAddNewParameterComponent,
    DialogConfirmComponent,
    DialogDataproductAddDistributionComponent,
    DialogDataproductAddWebserviceComponent,
    FormatRangePipe,
    DialogNewDataproductComponent,
    DialogChangeCommentComponent,
  ],
  imports: [CommonModule, AngularMaterialModule, MatExpansionModule, MatIconModule],
})
export class DialogModule {}
