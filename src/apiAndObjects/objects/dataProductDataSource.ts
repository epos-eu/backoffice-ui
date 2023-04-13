import { BaseObject } from '../_lib_code/objects/baseObject';

export class DataProductDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
  };

  public readonly instanceId: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(DataProductDataSource.KEYS.INSTANCE_ID);
  }
}
