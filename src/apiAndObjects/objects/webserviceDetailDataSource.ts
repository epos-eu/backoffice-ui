import { BaseObject } from '../_lib_code/objects/baseObject';

export class WebserviceDetailDataSource extends BaseObject {
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

    this.instanceId = this._getString(WebserviceDetailDataSource.KEYS.INSTANCE_ID);
    this.metaId = this._getString(WebserviceDetailDataSource.KEYS.META_ID);
    this.uid = this._getString(WebserviceDetailDataSource.KEYS.UID);
  }
}
