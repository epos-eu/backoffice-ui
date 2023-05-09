import { BaseObject } from '../_lib_code/objects/baseObject';

export class CreateUpdateDistributionDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
    UID: 'uid',
  };

  public readonly instanceId: string;
  public readonly uid: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(CreateUpdateDistributionDataSource.KEYS.INSTANCE_ID);
    this.uid = this._getString(CreateUpdateDistributionDataSource.KEYS.UID);
  }
}
