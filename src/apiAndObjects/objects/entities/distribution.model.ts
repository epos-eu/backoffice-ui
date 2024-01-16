import { State } from 'src/utility/enums/state.enum';
import { Group } from './group.model';
import { EntityDetail } from '../types/entityDetail.type';
export class Distribution {
  constructor(
    public uid?: string,
    public accessService?: EntityDetail,
    public accessURL?: Array<EntityDetail>,
    public changeComment?: string,
    public changeTimestamp?: Date | undefined,
    public conformsTo?: string,
    public dataPolicy?: string,
    public dataProduct?: Array<EntityDetail>,
    public description?: Array<string>,
    public downloadURL?: Array<string>,
    public editorId?: string,
    public fileProvenance?: string,
    public format?: string,
    public groups?: Array<Group>,
    public instanceChangedId?: string,
    public instanceId?: string,
    // public issued?: Date | undefined,
    public licence?: string,
    public metaId?: string,
    public modified?: string,
    public operation?: string,
    public state?: State,
    public title?: Array<string>,
    public toBeDelete?: string,
    public type?: string,
    public version?: string,
  ) {}
}
