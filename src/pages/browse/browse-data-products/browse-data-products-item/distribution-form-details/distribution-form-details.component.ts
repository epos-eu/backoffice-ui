import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { DialogRevisionsComponent } from 'src/components/dialogs/dialog-revisions/dialog-revisions.component';
import { ActionsService } from 'src/services/actions.service';
import { OperationsService } from 'src/services/calls/operations.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { State } from 'src/utility/enums/state.enum';
import { FormatTypes } from './formats';
import { ExplorerService } from 'src/components/side-navigation/explorer-navigation/explorer.service';
import { FormTree } from 'src/components/side-navigation/explorer-navigation/formTree';
import {
  DialogDataproductAddWebserviceComponent,
  NewWebservice,
} from 'src/components/dialogs/dialog-dataproduct-add-webservice/dialog-dataproduct-add-webservice.component';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { StateChangeService } from 'src/services/stateChange.service';
import { HelpersService } from 'src/services/helpers.service';

export interface IFormTree {
  parent: string;
  section: FormTree;
}

@Component({
  selector: 'app-distribution-form-details',
  templateUrl: './distribution-form-details.component.html',
  styleUrls: ['./distribution-form-details.component.scss'],
})
export class DistributionFormDetailsComponent {
  @Input() set distributionDetails(details: EntityDetail | undefined) {
    if (null != details) {
      this.initData(details.instanceId);
      this.instanceId = details.instanceId;
      this.entityDetails = details;
    }
  }
  @Input() metaId!: string;
  @Output() formTreeUpdate = new EventEmitter<IFormTree>();

  public floatLabelControl = new UntypedFormControl('auto');
  public distribution!: DistributionDetailDataSource | undefined;
  public UID!: string | null;
  public form!: UntypedFormGroup;
  public entityRoute = EntityEndpointValue.DISTRIBUTION;
  public accessService!: EntityDetail;
  public entityDetails?: EntityDetail;
  public dataProductAccessibility?: string;
  public dataProductAccessibilityOptions: string[] = ['download', 'webservice'];
  public formats = FormatTypes;
  public selectedFormat = '';
  public selectedSection = '';
  public instanceId = '';
  public disabled = false;
  private formTreeDownload: FormTree = { id: '#distaccessibledownload', name: 'Download', children: [] };
  private formTreeWebService: FormTree = {
    id: '#distaccessiblewebservice',
    name: 'Web Service',
    children: [],
    expanded: true,
  };

  constructor(
    private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private operationsService: OperationsService,
    private explorerService: ExplorerService,
    private stateChangeService: StateChangeService,
    private helpersService: HelpersService,
  ) {
    this.stateChangeService.currentDataProductStateObs.subscribe((state: State | null) => {
      if (state === null || state === State.PUBLISHED) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
  }

  private initData(id: string): void {
    this.apiService.endpoints.Distribution.get
      .call(
        {
          metaId: this?.metaId,
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
            this.disabled ? this.form.disable() : this.form.enable();
          }
        }
      });

    this.explorerService.gotoObs.subscribe((obs) => {
      this.selectedSection = obs;
    });
  }

  private checkDataProductAccessibility(): string {
    if (this.distribution) {
      if (this.distribution.accessService?.instanceId !== undefined) {
        this.formTreeUpdate.emit({
          parent: '#distaccessible',
          section: this.formTreeWebService,
        });
        return 'webservice';
      }
    }

    this.formTreeUpdate.emit({
      parent: '#distaccessible',
      section: this.formTreeDownload,
    });
    return 'download';
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
      state: this.distribution?.state,
      dataProduct: [this.distribution?.dataProduct],
      dataProductAccessibility: this.checkDataProductAccessibility(),
      format: this.distribution?.format,
      downloadURL: this.formBuilder.control(this.distribution?.downloadURL, [
        Validators.required,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (control: AbstractControl): { [key: string]: any } | null => {
          if (this.helpersService.isValidHttpUrl(control.value)) {
            return null;
          } else {
            control.markAsTouched();
            return { 'error-class': control.value };
          }
        },
      ]),
    });

    this.form.valueChanges.subscribe((changes) => {
      const updatingObject = this.operationsService.getActiveDistributionValue();
      if (changes['dataProductAccessibility'] === 'download') {
        this.formTreeUpdate.emit({
          parent: '#distaccessible',
          section: this.formTreeDownload,
        });
        this.explorerService.removeFormSection('#distaccessible', '#distaccessiblewebservice');
      } else {
        this.explorerService.removeFormSection('#distaccessible', '#distaccessibledownload');
      }

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
    this.dialogService.openDialogForComponent(
      DialogRevisionsComponent,
      {
        metaId: this.distribution?.metaId,
      },
      'revisions-dialog',
    );
  }

  public handleSave(): void {
    this.operationsService.handleDistributionSave();
    this.actionsService.showSaveDistributionMessage(false);
  }

  public deleteDistribution(instanceId: string | undefined): void {
    if (instanceId !== undefined) {
      this.dialogService.handleDelete(instanceId, EntityEndpointValue.DISTRIBUTION, false);
    }
  }

  public newWebservice() {
    const relatedDistribution: EntityDetail = {
      entityType: Entity.DISTRIBUTION,
      instanceId: this.distribution?.instanceId as string,
      uid: this.distribution?.uid as string,
      metaId: this.distribution?.metaId as string,
    };
    const item: WebService = {
      distribution: [relatedDistribution],
      uid: '',
      dateModified: new Date(),
    };

    this.dialogService
      .openDialogForComponent(DialogDataproductAddWebserviceComponent, {}, 'add-webservice-dialog')
      .then((data: DialogData<object, NewWebservice>) => {
        if (data.dataOut.create) {
          item.uid = 'dummy-webservice-uid-to-generate';
          this.apiService.endpoints.WebService.create
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
              const distribution = this.operationsService.getActiveDistributionValue();
              if (null != distribution) {
                distribution.accessService = this.accessService;
                this.operationsService.setActiveDistribution(distribution);
              }
            })
            .catch(() =>
              this.snackbarService.openSnackbar(`Error: failed to create new Distribution`, 'close', 'error', 6000, [
                'snackbar',
                'mat-toolbar',
                'snackbar-error',
              ]),
            );
        }
      });
  }
}
