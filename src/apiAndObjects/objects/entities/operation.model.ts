import { State } from 'src/utility/enums/state.enum';
import { EntityDetail } from '../types/entityDetail.type';
import { Mapping } from '../types/mapping.type';

export class Operation {
  constructor(
    public changeComment: string,
    public changeTimestamp: Date,
    public editorId: string,
    public fileProvenance: string,
    public groups: Array<EntityDetail>,
    public instanceChangedId: string,
    public instanceId: string,
    public mapping: Array<Mapping>,
    public metaId: string,
    public method: string,
    public operation: string,
    public returns: Array<string>,
    public state: State,
    public template: string,
    public toBeDelete: string,
    public uid: string,
    public version: string,
    public webservice: Array<EntityDetail>,
  ) {}
}
