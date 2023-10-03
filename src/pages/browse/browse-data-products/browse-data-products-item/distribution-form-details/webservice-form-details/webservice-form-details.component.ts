import { Component, ElementRef, Input, QueryList, ViewChildren, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ReplaySubject, Subject } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { OrganizationDataSource } from 'src/apiAndObjects/objects/data-source/organizationDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { ExplorerService } from 'src/components/side-navigation/explorer-navigation/explorer.service';
import { HelpersService } from 'src/services/helpers.service';
import { OperationsService } from 'src/services/operations.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { SpatialCoverageType } from 'src/utility/enums/spatialCoverageType.enum';
import { SpatialExtent } from 'src/apiAndObjects/objects/types/spatialExtent.type';
import { AcrualPeriodicity } from 'src/utility/enums/vocabulary/accrualPeriodicity.enum';
import { DcmiType } from 'src/utility/enums/vocabulary/dcmiType.enum';
import * as moment from 'moment';
import { Documentation } from 'src/apiAndObjects/objects/types/documentation.type';
import { State } from 'src/utility/enums/state.enum';
import { StateChangeService } from 'src/services/stateChange.service';
import { SpatialExtentLocationIndexObj } from '../../spatial-coverage-form-details/spatial-coverage-map/simpleSpatialControl/simpleSpatialControl.component';

@Component({
  selector: 'app-webservice-form-details',
  templateUrl: './webservice-form-details.component.html',
  styleUrls: ['./webservice-form-details.component.scss'],
})
export class WebserviceFormDetailsComponent implements OnInit {
  @Input() set accessService(webserviceDetails: EntityDetail) {
    if (null != webserviceDetails) {
      this.instanceId = webserviceDetails.instanceId;
      this.initData(webserviceDetails.instanceId);
    }
  }
  @Input() parentEntity?: EntityDetail;
  @Input() metaId!: string;

  @ViewChildren('expansionPanel', { read: ElementRef }) panels!: QueryList<ElementRef>;

  public options: UntypedFormGroup;
  private hideRequiredControl = new UntypedFormControl(false);
  public floatLabelControl = new UntypedFormControl('auto');
  public webservice!: WebserviceDetailDataSource | undefined;
  public editModeEnabled = false;
  public form!: UntypedFormGroup;
  public serviceProviders: Array<OrganizationDataSource> = [];
  public serviceProvidersLoading = false;
  public selectedServiceProvider: OrganizationDataSource | undefined;
  public contactPointDetails: Array<EntityDetail> = [];
  public contactPointShowSaveNotify = false;
  public operation!: Operation | undefined;
  public callOperationDetail = false;
  public selectedPanelId: ReplaySubject<number> = new ReplaySubject();
  public selectedSection = '';
  public supportedOperationSearchValue = '';
  public supportedOperationFocusFirstRow = false;
  public labelSpatialCoverage: Array<string> = [''];
  public spatialCoveragePoint = SpatialCoverageType.POINT as string;
  public spatialCoveragePolygon = SpatialCoverageType.POLYGON as string;
  public spatialCoverageInput: Array<string | undefined> = [];
  public spatialCoverageChange: Subject<Array<string | undefined>> = new Subject();
  public accrualPeriodicityOptions: Array<{ id: string; name: string }> = [];
  public typeOptions: Array<{ id: string; name: string }> = [];
  public entityEnum = Entity;
  public dateForm!: UntypedFormGroup;
  public disabled = false;

  private updateMapTimeout?: NodeJS.Timeout;

  public instanceId = '';
  private formTree = {
    id: '#distaccessiblewebservice',
    name: 'Web Service',
    children: [
      {
        id: '#wscontactpoint',
        name: 'Contact Points',
        children: [],
        expanded: false,
      },
      {
        id: '#wssupportedoperation',
        name: 'Supported operation',
        children: [],
        expanded: false,
      },
      {
        id: '#wsspatialcoverage',
        name: 'Spatial Coverage',
        children: [],
        expanded: false,
      },
      {
        id: '#wstemporalcoverage',
        name: 'Temporal Coverage',
        children: [],
        expanded: false,
      },
    ],
    expanded: true,
  };
  private updatingObject = this.operationsService.getActiveWebServiceValue();

  constructor(
    private fb: UntypedFormBuilder,
    private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private operationsService: OperationsService,
    private explorerService: ExplorerService,
    private stateChangeService: StateChangeService,
  ) {
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.accrualPeriodicityOptions = Object.entries(AcrualPeriodicity).map((e) => ({ name: e[1], id: e[0] }));
    this.typeOptions = Object.entries(DcmiType).map((e) => ({ name: e[1], id: e[0] }));

    this.stateChangeService.currentDataProductStateObs.subscribe((state: State | null) => {
      if (state === null || state === State.PUBLISHED) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
    // this.webservice = this.router.getCurrentNavigation()?.extras.state as WebService;
  }
  ngOnInit(): void {
    this.explorerService.gotoObs.subscribe((obs) => {
      this.selectedSection = obs;
    });
  }

  private initData(id: string): void {
    this.apiService.endpoints[Entity.WEBSERVICE].get
      .call(
        {
          metaId: this.metaId,
          instanceId: id,
        },
        false,
      )
      .then((data: Array<WebserviceDetailDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.webservice = data.shift();
          console.log(this.webservice);
          if (this.webservice) {
            this.operationsService.setActiveWebService(this.operationsService.convertToWebService(this.webservice));
            this.handleServiceProviders(this.webservice);
            this.setSpatialCoverageVariables();
            this.contactPointDetails = this.webservice?.contactPoint ?? [];
            if (this.webservice && this.webservice.instanceId) {
              this.trackFormData();
              if (this.disabled) {
                this.form.disable();
                this.dateForm.disable();
              } else {
                this.form.enable();
                this.dateForm.enable();
              }
            }
          }
        }
      });
  }

  public isValidHttpUrl(urlToCheck: string) {
    let url;
    try {
      url = new URL(urlToCheck);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  private getDocumentation(documentation: Array<Documentation> | undefined): string {
    if (documentation !== undefined) {
      if (documentation.length > 0) {
        return documentation[0].URI ? documentation[0].URI : '';
      }
    }
    return '';
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      instanceId: this.webservice?.instanceId as string,
      metaId: this.webservice?.metaId,
      name: this.webservice?.name,
      description: this.webservice?.description,
      documentation: this.formBuilder.control(this.getDocumentation(this.webservice?.documentation), [
        Validators.required,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (control: AbstractControl): { [key: string]: any } | null => {
          if (this.isValidHttpUrl(control.value)) {
            return null;
          } else {
            control.markAsTouched();
            return { 'error-class': control.value };
          }
        },
      ]),
      temporalExtentStartDate: this.getTemporalExtent('startDate'),
      temporalExtentEndDate: this.getTemporalExtent('endDate'),
      dateModified: this.webservice?.dateModified,
      changeComment: this.webservice?.changeComment,
      changeTimestamp: this.webservice?.changeTimestamp,
      entryPoint: this.webservice?.entryPoint,
      keywords: HelpersService.whiteSpaceReplace(this.webservice?.keywords),
      license: this.webservice?.license,
    });

    this.dateForm = this.formBuilder.group({
      datePublished: [this.webservice?.datePublished],
      dateModified: [this.webservice?.dateModified],
    });

    this.explorerService.setFormSection(
      '#distaccessible' + this.parentEntity?.instanceId,
      this.formTree,
      false,
      this.instanceId,
    );

    this.form.valueChanges.subscribe((changes) => {
      if (this.updatingObject) {
        this.updatingObject.name = changes['name'];
        this.updatingObject.description = changes['description'];
        this.updatingObject.temporalExtent = [
          {
            startDate: this.getDate(changes['temporalExtentStartDate']),
            endDate: this.getDate(changes['temporalExtentEndDate']),
          },
        ];
        this.updatingObject.documentation = [
          {
            description: '',
            title: '',
            uri: changes['documentation'],
          },
        ];
        // updatingObject.distribution = [this.parentEntity as EntityDetail];
        this.operationsService.setActiveWebService(this.updatingObject);
      }
    });

    this.dateForm.valueChanges.subscribe((changes) => {
      if (this.updatingObject) {
        this.updatingObject.dateModified = changes.dateModified;
        this.updatingObject.datePublished = changes.datePublished;
        this.operationsService.setActiveWebService(this.updatingObject);
      }
    });
  }

  public handleChange(event: MatSlideToggleChange): void {
    this.editModeEnabled = event.checked;
  }

  public handleSave() {
    this.operationsService.handleWebserviceSave();
  }

  public handleDelete(): void {
    if (this.webservice && this.webservice.instanceId) {
      this.dialogService.handleDelete(this.webservice.instanceId, EntityEndpointValue.WEBSERVICE);
    }
  }

  public addNewOperation(): void {
    const webserviceEtityDetail: EntityDetail = {
      entityType: Entity.WEBSERVICE,
      instanceId: this.webservice?.instanceId ?? '',
      uid: this.webservice?.uid ?? '',
      metaId: this.webservice?.metaId ?? '',
    };
    this.dialogService
      .handleAddWebserviceOperation(webserviceEtityDetail)
      .then((result: OperationDetailDataSource | unknown) => {
        if (result instanceof OperationDetailDataSource) {
          // put result on supportedOperation array (first position and focused)
          const operation: EntityDetail = {
            entityType: Entity.OPERATION,
            instanceId: result.instanceId,
            uid: result.uid,
            metaId: result.metaId,
          };

          this.webservice?.supportedOperation.unshift(operation);
          this.supportedOperationFocusFirstRow = true;
        }
      });
  }

  public formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' });
    }
    return 'Invalid date';
  };

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.webservice?.metaId,
      },
      '35vw',
      'auto',
      'revisions-dialog',
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public compareWithFn(optionOne: any, optionTwo: any): boolean {
    if (optionOne && optionTwo) {
      if (optionOne.metaId === optionTwo.metaId) {
        return true;
      }
      return false;
    }
    return false;
  }

  public updateContactPointArray(newContactPointDetails: Array<EntityDetail>) {
    const webservice = this.operationsService.getActiveWebServiceValue();
    this.contactPointDetails = newContactPointDetails;
    if (null != webservice) {
      webservice.contactPoint = this.contactPointDetails;
      this.operationsService.setActiveWebService(webservice);
    }

    // inform user that he has to save entire form
    this.contactPointShowSaveNotify = true;
  }

  public updateServicePoint() {
    const webservice = this.operationsService.getActiveWebServiceValue();
    if (null != webservice && null != this.selectedServiceProvider) {
      const serviceProviderEntityDetail: EntityDetail = {
        entityType: Entity.ORGANIZATION,
        instanceId: this.selectedServiceProvider.instanceId,
        uid: this.selectedServiceProvider.uid,
        metaId: this.selectedServiceProvider.metaId,
      };
      webservice.provider = serviceProviderEntityDetail;
      this.operationsService.setActiveWebService(webservice);
    }
  }

  private handleServiceProviders(webservice: WebserviceDetailDataSource): void {
    if (this.serviceProviders.length === 0) {
      this.serviceProvidersLoading = true;
      this.apiService.endpoints.Organization.getAll.call().then((response: OrganizationDataSource[]) => {
        if (webservice.provider) {
          this.selectedServiceProvider = response.find(
            (value: OrganizationDataSource) => value.uid === webservice.provider.uid,
          );
        }
        this.serviceProviders = response;
        this.serviceProvidersLoading = false;
      });
    }
  }

  public handleOperationParams(index: number): void {
    const selectedPanel = this.panels.find((panel) => Number(panel.nativeElement.id) === index);
    this.selectedPanelId.next(Number(selectedPanel?.nativeElement.id));
  }

  /**
   * The function searches for a value in a list of supported operations and updates a flag indicating
   * whether to focus on the first row.
   * @param {any} event - The event parameter is an object that represents the event that triggered the
   * search operation. It could be an input event, keyup event, or any other event that is used to
   * capture user input.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public supportedOperationSearch(event: any): void {
    const value = event.target.value;
    if (value.length > 1) {
      const supportedOperation = this.webservice?.supportedOperation ?? [];
      const foundIndex = supportedOperation.findIndex((operation) =>
        operation.uid.toUpperCase().includes(value.toUpperCase()),
      );
      if (foundIndex > -1) {
        this.supportedOperationFocusFirstRow = true;
        supportedOperation.push(...supportedOperation.splice(0, foundIndex));
      } else {
        this.supportedOperationFocusFirstRow = false;
      }
    } else {
      this.supportedOperationFocusFirstRow = false;
    }
  }

  /**
   * The `deleteOperation` function deletes an operation instance and updates the supported operations
   * list.
   * @param {string} instanceId - The `instanceId` parameter is a string that represents the unique
   * identifier of the operation instance that needs to be deleted.
   */
  public deleteOperation(instanceId: string): void {
    this.dialogService.handleDelete(instanceId, EntityEndpointValue.OPERATION, false);
    this.webservice?.supportedOperation.splice(
      this.webservice?.supportedOperation.findIndex((e) => e.instanceId === instanceId),
      1,
    );
  }

  public newSpatialCoverage() {
    this.webservice?.spatialExtent.push({ location: 'POINT(0 0)' });
    this.spatialCoverageInput.push('0 0');

    // Update Global Web Service after change to Spatial Extents Arr
    this.operationsService.setActiveWebService(
      this.operationsService.convertToWebService(this.webservice as WebserviceDetailDataSource),
    );

    setTimeout(() => {
      this.refreshPointsOnMap();
    }, 100);
  }

  public deleteSpatialCoverage(index: number) {
    this.webservice?.spatialExtent.splice(index, 1);
    this.spatialCoverageInput.splice(index, 1);

    // Update Global Web Service after change to Spatial Extents Arr
    this.operationsService.setActiveWebService(
      this.operationsService.convertToWebService(this.webservice as WebserviceDetailDataSource),
    );

    setTimeout(() => {
      this.refreshPointsOnMap();
    }, 100);
  }

  public updateSpatialCoverage(event: SpatialExtentLocationIndexObj) {
    const webservice = this.operationsService.getActiveWebServiceValue();
    if (null != webservice?.spatialExtent) {
      webservice.spatialExtent.map((spatialExtent: SpatialExtent, index) => {
        if (event.index === index) {
          spatialExtent.location = event.location;
        }
      });
      this.operationsService.setActiveWebService(webservice);
      const spatExtentsToUpdate: Array<string> = [];
      webservice.spatialExtent.forEach((spatialExtent: SpatialExtent) => {
        spatExtentsToUpdate.push(spatialExtent.location);
      });
      this.spatialCoverageInput = spatExtentsToUpdate;

      clearTimeout(this.updateMapTimeout);
      this.updateMapTimeout = setTimeout(() => {
        this.refreshPointsOnMap();
      }, 100);
    }
  }

  /**
   * The function refreshes points on a map by formatting the spatial extent from a string to an object
   * and emitting the location values.
   */
  public refreshPointsOnMap() {
    this.spatialCoverageChange.next(this.spatialCoverageInput);
  }

  /**
   * The function sets spatial coverage variables based on the data product's spatial extent.
   */
  private setSpatialCoverageVariables() {
    this.webservice?.spatialExtent.forEach((item, index) => {
      this.spatialCoverageInput[index] = item.location;
    });
  }

  private getTemporalExtent(type = 'startDate'): Date | undefined | null {
    const temporalExtent = this.webservice?.temporalExtent;
    if (temporalExtent !== undefined && temporalExtent.length > 0) {
      if (type === 'startDate') {
        return temporalExtent[0].startDate;
      }
      return temporalExtent[0].endDate;
    }
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getDate(val: string | Date): any {
    if (val === null) {
      return '';
    }
    return moment.isMoment(val) ? val.toISOString() : (val as string);
  }

  public handleClearDatePicker(control: AbstractControl): void {
    this.operationsService.clearDatePicker(control);
  }
}
