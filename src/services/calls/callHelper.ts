import { BehaviorSubject } from 'rxjs';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';

export class CallHelper {
  public readonly dataProduct = new BehaviorSubject<DataProduct | null>(null);
  public dataProductObs = this.dataProduct.asObservable();

  public readonly distribution = new BehaviorSubject<Distribution | null>(null);
  public distributionObs = this.distribution.asObservable();

  public readonly contactPoint = new BehaviorSubject<ContactPoint | null>(null);
  public contactPointObs = this.contactPoint.asObservable();

  public readonly webService = new BehaviorSubject<WebService | null>(null);
  public webServiceObs = this.webService.asObservable();

  public readonly operation = new BehaviorSubject<Operation | null>(null);
  public operationObs = this.operation.asObservable();

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

  /**
   * The function `convertToDataProduct` takes an initial `DataProductDetailDataSource` object and
   * converts it into a `DataProduct` object.
   * @param {DataProductDetailDataSource} initial - The `initial` parameter is an object of type
   * `DataProductDetailDataSource`. It contains various properties that are used to initialize a new
   * instance of the `DataProduct` class.
   * @returns an instance of the `DataProduct` class.
   */
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

  /**
   * The function `convertToDistribution` takes an initial `DistributionDetailDataSource` object and
   * returns a new `Distribution` object with the same properties.
   * @param {DistributionDetailDataSource} initial - The `initial` parameter is of type
   * `DistributionDetailDataSource`. It is an object that contains various properties representing the
   * details of a distribution.
   * @returns an instance of the `Distribution` class.
   */
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

  /**
   * The function converts an initial ContactPointDetailDataSource object into a ContactPoint object and
   * returns it.
   * @param {ContactPointDetailDataSource} initial - The `initial` parameter is an object of type
   * `ContactPointDetailDataSource`. It contains various properties such as `uid`, `changeComment`,
   * `changeTimestamp`, `editorId`, `email`, `fileProvenance`, `groups`, `instanceChangedId`,
   * `instanceId`, `language
   * @returns an instance of the `ContactPoint` class.
   */
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

  /**
   * The function converts an initial WebserviceDetailDataSource object into a WebService object and
   * returns it.
   * @param {WebserviceDetailDataSource} initial - The `initial` parameter is of type
   * `WebserviceDetailDataSource`. It is an object that contains various properties representing the
   * details of a web service.
   * @returns an instance of the WebService class.
   */
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

  /**
   * The function converts an initial OperationDetailDataSource object into an Operation object.
   * @param {OperationDetailDataSource} initial - The `initial` parameter is an object of type
   * `OperationDetailDataSource`. It contains various properties that are used to create a new instance
   * of the `Operation` class.
   * @returns an instance of the `Operation` class with properties set based on the values of the
   * `initial` object passed as a parameter.
   */
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
}
