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
import { ExplorerService } from 'src/components/side-navigation/explorer-navigation/explorer.service';
import { FormTree } from 'src/components/side-navigation/explorer-navigation/formTree';
import {
  DataproductAddWebserviceComponent,
  NewWebservice,
} from 'src/components/dialogs/dataproduct-add-webservice/dataproduct-add-webservice.component';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { StateChangeService } from 'src/services/stateChange.service';

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

  private formTree = {
    id: '#distribution',
    name: 'Distribution',
    children: [
      {
        id: '#distgeneralinformation',
        name: 'General Information',
        children: [],
        expanded: false,
      },
      {
        id: '#distaccessible',
        name: 'Data access',
        children: [],
        expanded: true,
      },
    ],
    expanded: true,
  };

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
        this.explorerService.setFormSection('#distaccessible', this.formTreeWebService, false, this.instanceId);
        return 'webservice';
      }
    }

    this.explorerService.setFormSection('#distaccessible', this.formTreeDownload, false, this.instanceId);
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
      // modified: this.distribution?.modified,
      dataProduct: [this.distribution?.dataProduct],
      dataProductAccessibility: this.checkDataProductAccessibility(),
      format: this.distribution?.format,
      downloadURL: this.distribution?.downloadURL,
      // issued: this.distribution?.issued,
    });

    this.explorerService.setFormSection('#dataproduct', this.formTree, false, this.instanceId);

    this.form.valueChanges.subscribe((changes) => {
      const updatingObject = this.operationsService.getActiveDistributionValue();
      if (changes['dataProductAccessibility'] === 'download') {
        this.explorerService.setFormSection('#distaccessible', this.formTreeDownload, false);
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
      .openDialogForComponent(DataproductAddWebserviceComponent, {}, '35vw', 'auto', 'add-webservice-dialog')
      .then((data: DialogData<object, NewWebservice>) => {
        if (data.dataOut.uid && data.dataOut.uid !== '') {
          item.uid = data.dataOut.uid;
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
