import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class OrganisationDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    ADDRESS: 'address',
    CONTACT_POINT: 'contactPoint',
    EMAIL: 'email',
    FILE_PROVENANCE: 'fileProvenance',
    IDENTIFIER: 'identifier',
    LEGAL_NAME: 'legalName',
    LEI_CODE: 'leiCode',
    LOGO: 'logo',
    MEMBER_OF: 'memberOf',
    OWNS: 'owns',
    TELEPHONE: 'telephone',
    UID: 'uid',
    URL: 'url',
  };

  public readonly id: string;
  public readonly name: string;
  public readonly url: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(OrganisationDataSource.KEYS.UID);
    this.name = this._getString(OrganisationDataSource.KEYS.LEGAL_NAME);
    this.url = this._getString(OrganisationDataSource.KEYS.URL);
  }
}
