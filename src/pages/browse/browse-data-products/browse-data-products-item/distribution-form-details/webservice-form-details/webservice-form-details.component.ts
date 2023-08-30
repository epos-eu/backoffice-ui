import { Component, ElementRef, Input, QueryList, ViewChildren, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ReplaySubject } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
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
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

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
  @Input() parentId = '';
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
  public selectedServiceProvider: EntityDetail | null = null;
  public showContactPointSelect = false;
  public contactPointDetails: Array<EntityDetail> = [];
  public contactPointsFromCatalog: Array<ContactPointDetailDataSource> = [];
  public operation!: Operation | undefined;
  public callOperationDetail = false;
  public selectedPanelId: ReplaySubject<number> = new ReplaySubject();
  public selectedSection = '';
  public supportedOperationSearchValue = '';
  public supportedOperationFocusFirstRow = false;

  public instanceId = '';
  private formTree = {
    id: '#distaccessiblewebservice',
    name: 'Web Service',
    children: [
      {
        id: '#wscontactpoint',
        name: 'Contact Point',
        children: [],
        expanded: false,
      },
      {
        id: '#wssupportedoperation',
        name: 'Supported operation',
        children: [],
        expanded: false,
      },
    ],
    expanded: true,
  };

  constructor(
    private fb: UntypedFormBuilder,
    private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private operationsService: OperationsService,
    private explorerService: ExplorerService,
  ) {
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    // this.webservice = this.router.getCurrentNavigation()?.extras.state as WebService;
  }
  ngOnInit(): void {
    this.handleServiceProviders();

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
          if (this.webservice) {
            this.operationsService.setActiveWebService(this.operationsService.convertToWebService(this.webservice));
            this.selectedServiceProvider = this.webservice?.provider ?? null;
            this.contactPointDetails = this.webservice?.contactPoint ?? [];
            if (this.webservice && this.webservice.instanceId) {
              this.trackFormData();
            }
          }
        }
      });
  }

  private getDocumentation(): string {
    if (this.webservice?.documentation !== undefined) {
      const documentation = this.webservice.documentation;
      if (documentation.length > 0) {
        return documentation[0].uri;
      }
    }
    return '';
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      instanceId: this.webservice?.instanceId as string,
      metaId: this.webservice?.metaId,
      description: this.webservice?.description,
      documentation: this.getDocumentation(),
      // datePublished: this.webservice?.datePublished,
      dateModified: this.webservice?.dateModified,
      changeComment: this.webservice?.changeComment,
      changeTimestamp: this.webservice?.changeTimestamp,
      // identifier: this.webservice?.identifier,
      entryPoint: this.webservice?.entryPoint,
      keywords: HelpersService.whiteSpaceReplace(this.webservice?.keywords),
      // supportedOperation: this.webservice?.supportedOperation,
      // temporalExtent: this.webservice?.temporalExtent,
      license: this.webservice?.license,
    });

    this.explorerService.setFormSection('#distaccessible' + this.parentId, this.formTree, false, this.instanceId);

    this.form.valueChanges.subscribe((changes) => {
      const updatingObject = this.operationsService.getActiveWebServiceValue();
      if (updatingObject) {
        updatingObject.description = changes['description'];
        this.operationsService.setActiveWebService(updatingObject);
      }
    });
  }

  public handleChange(event: MatSlideToggleChange): void {
    this.editModeEnabled = event.checked;
  }

  public handleSave() {
    this.operationsService.handleWebserviceSave();
    // this.apiService.endpoints.Webservice.update
    //   .call(this.form.value as WebService)
    //   .then((data: WebserviceDetailDataSource) => {
    //     const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    //     if (localStorage !== null) {
    //       const entityDetail: EntityDetail = {
    //         entityType: 'webservice',
    //         metaId: data.metaId,
    //         uid: data.uid,
    //         instanceId: data.instanceId,
    //       };
    //       const formData: DataProduct = JSON.parse(localStorage);
    //       formData.distribution?.push(entityDetail);
    //       this.persistorService.setValueInStorage(
    //         StorageType.LOCAL_STORAGE,
    //         StorageKey.FORM_DATA,
    //         JSON.stringify(formData),
    //       );
    //     }
    //   });
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

  /* public handleServiceProviderChange(event: Array<OrganizationDataSource>): void {
    const mapped = event.map((item: OrganizationDataSource) => {
      return {
        uid: item.uid,
        metaId: item.metaId,
        instanceId: item.instanceId,
        entityType: '',
      };
    });
    mapped.forEach((provider: EntityDetail) => {
      if (this.webservice) {
        this.webservice.provider = provider;
      }
    });
  } */

  public compareWithFn(optionOne: any, optionTwo: any): boolean {
    if (optionOne.metaId === optionTwo.metaId) {
      return true;
    }
    return false;
  }

  public newContactPoint() {
    this.apiService.endpoints.ContactPoint.getAll
      .call()
      .then((data: Array<ContactPointDetailDataSource>) => {
        this.showContactPointSelect = true;
        this.contactPointsFromCatalog = data;
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to request Contact Point entities.`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }

  public updateContactPointArray(event: MatSelectChange) {
    const value: ContactPointDetailDataSource = event.value;
    console.debug(value);
    const entityDetail: EntityDetail = {
      entityType: 'ContactPoint',
      instanceId: value.instanceId,
      uid: value.uid,
      metaId: value.metaId,
    };
    const dataProduct = this.operationsService.getActiveDataProductValue();
    /* this.contactPointDetails.push(entityDetail);
    if (null != dataProduct) {
      dataProduct.contactPoint = this.contactPointDetails;
      this.operationsService.setActiveDataProduct(dataProduct);
      this.showContactPointSelect = false;
    } */
  }

  private handleServiceProviders(): void {
    if (this.serviceProviders.length === 0) {
      this.serviceProvidersLoading = true;
      this.apiService.endpoints.Organization.getAll.call().then((response: OrganizationDataSource[]) => {
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
}
