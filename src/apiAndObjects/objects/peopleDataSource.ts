import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class PeopleDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    ADDRESS: 'address',
    AFFILIATION: 'affiliation',
    CVURL: 'cvurl',
    EMAIL: 'email',
    FAMILY_NAME: 'familyName',
    FILE_PROVENANCE: 'fileProvenance',
    GIVEN_NAME: 'givenName',
    IDENTIFIER: 'identifier',
    QUALIFICATIONS: 'qualifications',
    TELEPHONE: 'telephone',
    UID: 'uid',
  };

  public readonly id: string;
  public readonly name: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(PeopleDataSource.KEYS.UID);
    this.name = this._getString(PeopleDataSource.KEYS.FAMILY_NAME);
  }
}
