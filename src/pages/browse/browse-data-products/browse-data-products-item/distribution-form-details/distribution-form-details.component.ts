import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { ActionsService } from 'src/services/actions.service';
import { OperationsService } from 'src/services/operations.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { State } from 'src/utility/enums/state.enum';
import { FormatTypes } from './formats';

@Component({
  selector: 'app-distribution-form-details',
  templateUrl: './distribution-form-details.component.html',
  styleUrls: ['./distribution-form-details.component.scss'],
})
export class DistributionFormDetailsComponent {
  @Input() set distributionDetails(details: EntityDetail | undefined) {
    if (null != details) {
      this.initData(details.instanceId);
    }
  }

  public floatLabelControl = new UntypedFormControl('auto');
  public distribution!: DistributionDetailDataSource | undefined;
  public UID!: string | null;
  public form!: UntypedFormGroup;
  public entityRoute = EntityEndpointValue.DISTRIBUTION;
  public accessService!: EntityDetail;

  public dataProductAccessibility?: string;
  public dataProductAccessibilityOptions: string[] = ['download', 'webservice'];
  public formats = FormatTypes;
  public selectedFormat = '';

  constructor(
    private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private operationsService: OperationsService,
  ) {}

  private initData(id: string): void {
    this.apiService.endpoints.Distribution.get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.distribution = data.shift();
          if (this.distribution) {
            this.selectedFormat = this.distribution.format;
            this.operationsService.setActiveDistribution(
              this.operationsService.convertToDistribution(this.distribution),
            );
            this.accessService = this.distribution.accessService;
            this.trackFormData();
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      accessService: this.accessService,
      instanceId: this.distribution?.instanceId,
      uid: this.distribution?.uid,
      licence: this.distribution?.licence,
      metaId: this.distribution?.metaId,
      title: this.distribution?.title,
      description: this.distribution?.description,
      changeTimestamp: this.distribution?.changeTimestamp,
      state: this.distribution?.state,
      modified: this.distribution?.modified,
      dataProduct: [this.distribution?.dataProduct],
      dataProductAccessibility: '',
      format: this.distribution?.format,
      issued: this.distribution?.issued,
    });
    this.form.valueChanges.subscribe((changes) => {
      const updatingObject = this.operationsService.getActiveDistributionValue();
      if (updatingObject) {
        updatingObject.format = changes['format'];
        updatingObject.licence = changes['licence'];
        updatingObject.title = [changes['title']];
        updatingObject.description = [changes['description']];
        this.operationsService.setActiveDistribution(updatingObject);
      }
    });
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.distribution?.metaId,
      },
      '35vw',
      'auto',
      'revisions-dialog',
    );
  }

  public handleSave(): void {
    this.operationsService.handleDistributionSave();
  }

  public newWebservice() {
    const item: WebService = {
      uid: 'new webservice',
      dateModified: new Date(),
    };

    this.apiService.endpoints.Webservice.create
      .call(item)
      .then((value: WebserviceDetailDataSource) => {
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.actionsService.addEditedItems([
          {
            type: Entity.WEBSERVICE,
            route: EntityEndpointValue.WEBSERVICE,
            label: 'Webservice',
            state: State.DRAFT,
            color: 'draft',
            id: value.instanceId,
          },
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId);
        const entityDetail: EntityDetail = {
          entityType: Entity.WEBSERVICE,
          instanceId: value.instanceId,
          uid: value.uid,
          metaId: value.metaId,
        };
        this.accessService = entityDetail;
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Distribution`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }
}
