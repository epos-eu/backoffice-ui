import { Injectable } from '@angular/core';
import { PersistorService, StorageType } from './persistor.service';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { Entity } from 'src/utility/enums/entity.enum';
import { State } from 'src/utility/enums/state.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from './snackbar.service';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { ActionsService } from './actions.service';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { Router } from '@angular/router';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { Revision } from 'src/components/dialogs/dialog-revisions/dialog-revisions.component';
import { BehaviorSubject } from 'rxjs';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  public activeEntityType = new BehaviorSubject<Entity | null>(null);
  public activeEntityTypeObs = this.activeEntityType.asObservable();

  private dataProduct = new BehaviorSubject<DataProduct | null>(null);
  public dataProductObs = this.dataProduct.asObservable();

  private distribution = new BehaviorSubject<Distribution | null>(null);
  public distributionObs = this.distribution.asObservable();

  private contactPoint = new BehaviorSubject<ContactPoint | null>(null);
  public contactPointObs = this.contactPoint.asObservable();

  private webService = new BehaviorSubject<WebService | null>(null);
  public webServiceObs = this.webService.asObservable();

  private operation = new BehaviorSubject<Operation | null>(null);
  public operationObs = this.operation.asObservable();

  private revisions = new BehaviorSubject<Array<unknown>>([]);
  public revisionsObs = this.revisions.asObservable();

  constructor(
    private persistorService: PersistorService,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private router: Router,
  ) {}

  /**
   * Sets active DataProduct
   */
  public setActiveDataProduct(dataProduct: DataProduct): void {
    this.dataProduct.next(dataProduct);
  }

  /**
   * Gets active DataProduct
   */
  public getActiveDataProductValue(): DataProduct | null {
    return this.dataProduct.getValue();
  }

  /**
   * Sets active Distribution
   */
  public setActiveDistribution(distribution: Distribution): void {
    this.distribution.next(distribution);
  }

  /**
   * Gets active Distribution
   */
  public getActiveDistributionValue(): Distribution | null {
    return this.distribution.getValue();
  }

  /**
   * Sets active Distribution
   */
  public setActiveContactPoint(contactPoint: ContactPoint): void {
    this.contactPoint.next(contactPoint);
  }

  /**
   * Gets active Distribution
   */
  public getActiveContactPointValue(): ContactPoint | null {
    return this.contactPoint.getValue();
  }

  /**
   * Sets active WebService
   */
  public setActiveWebService(webService: WebService): void {
    this.webService.next(webService);
  }

  /**
   * Gets active WebService
   */
  public getActiveWebServiceValue(): WebService | null {
    return this.webService.getValue();
  }

  /**
   * Sets active Operation
   */
  public setActiveOperation(operation: Operation): void {
    this.operation.next(operation);
  }

  /**
   * Gets active Operation
   */
  public getActiveOperationValue(): Operation | null {
    return this.operation.getValue();
  }

  public convertToDataProduct(initial: DataProductDetailDataSource): DataProduct {
    const exportVar = new DataProduct(
      initial.uid,
      initial.changeComment,
      initial.changeTimestamp,
      initial.contactPoint,
      initial.description,
      initial.distribution,
      initial.identifier,
      initial.issued,
      initial.keywords,
      initial.modified,
      initial.temporalExtent,
      initial.title,
      initial.versionInfo,
      initial.accessRight,
      initial.accrualPeriodicity,
      initial.category,
      initial.created,
      initial.dctIdentifier,
      initial.documentation,
      initial.editorId,
      initial.fileProvenance,
      initial.hasPart,
      initial.hasQualityAnnotation,
      initial.instanceChangedId,
      initial.instanceId,
      initial.isPartOf,
      initial.metaId,
      initial.operation,
      initial.provenance,
      initial.publisher,
      initial.qualityAssurance,
      initial.relation,
      initial.spatialExtent,
      initial.state,
      initial.toBeDelete,
      initial.type,
      initial.version,
    );
    return exportVar;
  }

  public convertToDistribution(initial: DistributionDetailDataSource): Distribution {
    const exportVar = new Distribution(
      initial.uid,
      initial.accessService,
      initial.accessURL,
      initial.changeComment,
      initial.changeTimestamp,
      initial.conformsTo,
      initial.dataPolicy,
      initial.dataProduct,
      initial.description,
      initial.downloadURL,
      initial.editorId,
      initial.fileProvenance,
      initial.format,
      initial.groups,
      initial.instanceChangedId,
      initial.instanceId,
      // initial.issued,
      initial.licence,
      initial.metaId,
      initial.modified,
      initial.operation,
      initial.state,
      initial.title,
      initial.toBeDelete,
      initial.type,
      initial.version,
    );
    return exportVar;
  }

  public convertToContactPoint(initial: ContactPointDetailDataSource): ContactPoint {
    const exportVar = new ContactPoint(
      initial.uid,
      initial.changeComment,
      initial.changeTimestamp,
      initial.editorId,
      initial.email,
      initial.fileProvenance,
      initial.groups,
      initial.instanceChangedId,
      initial.instanceId,
      initial.language,
      initial.metaId,
      initial.operation,
      initial.organization,
      initial.person,
      initial.role,
      initial.state,
      initial.telephone,
      initial.toBeDelete,
      initial.version,
    );
    return exportVar;
  }

  public convertToWebService(initial: WebserviceDetailDataSource): WebService {
    const exportVar = new WebService(
      initial.uid,
      initial.aaaiTypes,
      initial.category,
      initial.changeComment,
      initial.changeTimestamp,
      initial.contactPoint,
      initial.dateModified,
      initial.datePublished,
      initial.description,
      initial.distribution,
      initial.documentation,
      initial.editorId,
      initial.entryPoint,
      initial.fileProvenance,
      initial.identifier,
      initial.instanceChangedId,
      initial.instanceId,
      initial.keywords,
      initial.license,
      initial.metaId,
      initial.name,
      initial.operation,
      initial.provider,
      initial.schemaIdentifier,
      initial.spatialExtent,
      initial.state,
      initial.supportedOperation,
      initial.temporalExtent,
      initial.toBeDelete,
      initial.version,
    );
    return exportVar;
  }

  public convertToOperation(initial: OperationDetailDataSource): Operation {
    const exportVar = new Operation(
      initial.uid,
      initial.changeComment,
      initial.changeTimestamp,
      initial.editorId,
      initial.fileProvenance,
      initial.groups,
      initial.instanceChangedId,
      initial.instanceId,
      initial.mapping,
      initial.metaId,
      initial.method,
      initial.operation,
      initial.returns,
      initial.state,
      initial.template,
      initial.toBeDelete,
      initial.version,
      initial.webservice,
    );
    return exportVar;
  }

  public handleDataProductSave(): void {
    const formData = this.getActiveDataProductValue();
    if (null != formData) {
      formData.modified = new Date();
      formData.instanceChangedId = undefined;

      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.DATA_PRODUCT].update
          .call({
            ...formData,
          })
          .then((data: DataProductDetailDataSource) => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
            this.actionsService.disableSave();
            if (!this.actionsService.itemExists(data.instanceId)) {
              this.actionsService.addEditedItems([
                {
                  type: Entity.DATA_PRODUCT,
                  route: EntityEndpointValue.DATA_PRODUCT,
                  label: 'Data product',
                  state: State.DRAFT,
                  color: 'draft',
                  id: data.instanceId,
                },
              ]);
              this.actionsService.saveCurrentEdit(data.instanceId);
            }

            // Timeout for more consistent navigation
            setTimeout(() => {
              this.router.navigate([
                `/browse/${EntityEndpointValue.DATA_PRODUCT}/details`,
                data.metaId,
                data.instanceId,
              ]);
            }, 100);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error updating draft.', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      } else {
        this.apiService.endpoints[Entity.DATA_PRODUCT].update
          .call({
            ...formData,
            state: State.DRAFT,
            instanceChangedId: formData.instanceId,
            metaId: formData.metaId,
          })
          .then((data: DataProductDetailDataSource) => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
            this.actionsService.disableSave();
            this.actionsService.addEditedItems([
              {
                type: Entity.DATA_PRODUCT,
                route: EntityEndpointValue.DATA_PRODUCT,
                label: 'Data product',
                state: State.DRAFT,
                color: 'draft',
                id: data.instanceId,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId);

            // Timeout for more consistent navigation
            setTimeout(() => {
              this.router.navigate([
                `/browse/${EntityEndpointValue.DATA_PRODUCT}/details`,
                data.metaId,
                data.instanceId,
              ]);
            }, 100);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      }
    }
  }

  public handleWebserviceSave(): void {
    const formData = this.getActiveWebServiceValue();
    if (formData !== null) {
      formData.dateModified = new Date();
      this.apiService.endpoints[Entity.WEBSERVICE].update
        .call({
          ...formData,
        })
        .then((data: WebserviceDetailDataSource) => {
          this.snackbarService.openSnackbar('Successfully updated Webservice.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          if (!this.actionsService.itemExists(data.instanceId)) {
            this.actionsService.addEditedItems([
              {
                type: Entity.WEBSERVICE,
                route: EntityEndpointValue.WEBSERVICE,
                label: 'Webservice',
                state: State.DRAFT,
                color: 'draft',
                id: data.instanceId,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId);
          }
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error updating Webservice.', 'Close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        });
      // } else {
      //   this.apiService.endpoints.Webservice.create
      //     .call({
      //       ...formData,
      //       datePublished: new Date(),
      //       identifier: [],
      //       state: State.DRAFT,
      //       supportedOperation: [],
      //       temporalExtent: [],
      //     })
      //     .then((data: WebserviceDetailDataSource) => {
      //       this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
      //         'snackbar',
      //         'mat-toolbar',
      //         'snackbar-success',
      //       ]);
      //       this.actionsService.addEditedItems([
      //         {
      //           type: Entity.WEBSERVICE,
      //           route: EntityEndpointValue.WEBSERVICE,
      //           label: 'Webservice',
      //           state: State.DRAFT,
      //           color: 'draft',
      //           id: data.instanceId,
      //         },
      //       ]);
      //       this.actionsService.saveCurrentEdit(data.instanceId);
      //       // this.itemsExist.next(true);
      //       this.actionsService.disableSave();
      //       this.router.navigate([`/browse/${EntityEndpointValue.WEBSERVICE}/details`, data.instanceId]);
      //     })
      //     .catch((err) => {
      //       console.error(err);
      //       this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
      //         'snackbar',
      //         'mat-toolbar',
      //         'snackbar-error',
      //       ]);
      //     });
      // }
    }
  }

  public handleDistributionSave(): void {
    const formData: Distribution = this.getActiveDistributionValue() as Distribution;
    if (formData) {
      // if (formData.state === State.DRAFT) {
      formData.modified = new Date().toISOString();
      formData.instanceChangedId = undefined;
      this.apiService.endpoints[Entity.DISTRIBUTION].update
        .call({
          ...formData,
        })
        .then((data: DistributionDetailDataSource) => {
          this.snackbarService.openSnackbar('Successfully updated Distribution.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          this.actionsService.showSaveDistributionMessage(false);
          if (!this.actionsService.itemExists(data.instanceId)) {
            this.actionsService.addEditedItems([
              {
                type: Entity.DISTRIBUTION,
                route: EntityEndpointValue.DISTRIBUTION,
                label: 'Distribution',
                state: State.DRAFT,
                color: 'draft',
                id: data.instanceId,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId);
          }
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error updating Distribution.', 'Close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        });
    }
    // } else {
    //   this.apiService.endpoints[Entity.DISTRIBUTION].create
    //     .call({
    //       ...formData,
    //       state: State.DRAFT,
    //     })
    //     .then((data: DistributionDetailDataSource) => {
    //       this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
    //         'snackbar',
    //         'mat-toolbar',
    //         'snackbar-success',
    //       ]);
    //       this.actionsService.addEditedItems([
    //         {
    //           type: Entity.DISTRIBUTION,
    //           route: EntityEndpointValue.DISTRIBUTION,
    //           label: 'Distribution',
    //           state: State.DRAFT,
    //           color: 'draft',
    //           id: data.instanceId,
    //         },
    //       ]);
    //       this.actionsService.saveCurrentEdit(data.instanceId);
    //       // this.itemsExist.next(true);
    //       this.actionsService.disableSave();
    //       this.router.navigate([`/browse/${EntityEndpointValue.DISTRIBUTION}/details`, data.instanceId]);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
    //         'snackbar',
    //         'mat-toolbar',
    //         'snackbar-error',
    //       ]);
    //     });
    // }
  }

  public handleContactPointSave(): void {
    const localStorage = this.persistorService.getValueFromStorage(
      StorageType.LOCAL_STORAGE,
      StorageKey.ACTIVE_CONTACT_FORM_DATA,
    );
    if (localStorage !== null) {
      const formData: ContactPoint = JSON.parse(localStorage);
      // if (formData.state === State.DRAFT) {
      this.apiService.endpoints[Entity.CONTACT_POINT].update
        .call({
          ...formData,
        })
        .then((data: ContactPointDetailDataSource) => {
          this.snackbarService.openSnackbar('Successfully updated Contact Point.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          if (!this.actionsService.itemExists(data.instanceId)) {
            this.actionsService.addEditedItems([
              {
                type: Entity.CONTACT_POINT,
                route: EntityEndpointValue.CONTACT_POINT,
                label: 'Contact Point',
                state: State.DRAFT,
                color: 'draft',
                id: data.instanceId,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId);
          }
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error updating Contact Point.', 'Close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        });
      // } else {
      // this.apiService.endpoints[Entity.CONTACT_POINT].create
      //   .call({
      //     ...formData,
      //     state: State.DRAFT,
      //   })
      //   .then((data: ContactPointDetailDataSource) => {
      //     this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
      //       'snackbar',
      //       'mat-toolbar',
      //       'snackbar-success',
      //     ]);
      //     this.actionsService.addEditedItems([
      //       {
      //         type: Entity.CONTACT_POINT,
      //         route: EntityEndpointValue.CONTACT_POINT,
      //         label: 'Contact Point',
      //         state: State.DRAFT,
      //         color: 'draft',
      //         id: data.instanceId,
      //       },
      //     ]);
      //     this.actionsService.saveCurrentEdit(data.instanceId);
      //     // this.itemsExist.next(true);
      //     this.actionsService.disableSave();
      //     this.router.navigate([`/browse/${EntityEndpointValue.CONTACT_POINT}/details`, data.instanceId]);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
      //       'snackbar',
      //       'mat-toolbar',
      //       'snackbar-error',
      //     ]);
      //   });
      // }
    }
  }

  public handleOperationSave(): void {
    const operationData = this.getActiveOperationValue();
    if (operationData !== null) {
      this.apiService.endpoints[Entity.OPERATION].update
        .call({
          ...operationData,
        })
        .then((data: OperationDetailDataSource) => {
          this.snackbarService.openSnackbar('Successfully updated Operation.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          console.log('updated object', data);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error updating Operation.', 'Close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        });
    }
  }

  public setRevisions(revisions: Array<unknown>): void {
    this.revisions.next(revisions);
  }

  public clearDatePicker(control: AbstractControl): void {
    control.reset();
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
}
