import { BaseObject } from '../_lib_code/objects/baseObject';

export class DistributionDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
    META_ID: 'metaId',
    UID: 'uid',
  };

  public readonly instanceId: string;
  public readonly metaId: string;
  public readonly uid: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(DistributionDetailDataSource.KEYS.INSTANCE_ID);
    this.metaId = this._getString(DistributionDetailDataSource.KEYS.META_ID);
    this.uid = this._getString(DistributionDetailDataSource.KEYS.UID);
  }
}
