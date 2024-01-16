import { State } from 'src/utility/enums/state.enum';
import { Group } from './group.model';
import { EntityDetail } from '../types/entityDetail.type';

export class ContactPoint {
  constructor(
    public uid?: string,
    public changeComment?: string,
    public changeTimestamp?: Date | undefined | null,
    public editorId?: string,
    public email?: Array<string>,
    public fileProvenance?: string,
    public groups?: Array<Group>,
    public instanceChangedId?: string,
    public instanceId?: string,
    public language?: Array<string>,
    public metaId?: string,
    public operation?: string,
    public organization?: EntityDetail,
    public person?: EntityDetail,
    public role?: string,
    public state?: State,
    public telephone?: Array<string>,
    public toBeDelete?: string,
    public version?: string,
  ) {}
}
