import { BaseObject } from '../_lib_code/objects/baseObject';

export class DataProductsDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
    META_ID: 'metaId',
    UID: 'uid',
    TITLE: 'title',
    DESCRIPTION: 'description',
    DISTRIBUTION: 'distribution',
  };

  public readonly instanceId: string;
  public readonly metaId: string;
  public readonly uid: string;
  public readonly title: Array<string>;
  public readonly description: Array<string>;
  public readonly distribution: Array<Record<string, unknown>>;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(DataProductsDataSource.KEYS.INSTANCE_ID);
    this.metaId = this._getString(DataProductsDataSource.KEYS.META_ID);
    this.uid = this._getString(DataProductsDataSource.KEYS.UID);
    this.title = this._getArray(DataProductsDataSource.KEYS.TITLE);
    this.description = this._getArray(DataProductsDataSource.KEYS.DESCRIPTION);
    this.distribution = this._getArray(DataProductsDataSource.KEYS.DISTRIBUTION);
  }
}
