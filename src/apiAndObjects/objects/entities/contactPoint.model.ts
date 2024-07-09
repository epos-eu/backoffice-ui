import { Status } from 'src/utility/enums/status.enum';
import { Group } from './group.model';
import { LinkedEntity } from 'generated/backofficeSchemas';

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
    public organization?: LinkedEntity,
    public person?: LinkedEntity,
    public role?: string,
    public state?: Status,
    public telephone?: Array<string>,
    public toBeDelete?: string,
    public version?: string,
  ) {}
}
