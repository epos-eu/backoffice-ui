import { State } from 'src/utility/enums/state.enum';
import { Group } from './group.model';

export class ContactPoint {
  constructor(
    public changeComment: string,
    public changeTimestamp: Date | undefined | null,
    public editorId: string,
    public email: Array<string>,
    public fileProvenance: string,
    public groups: Array<Group>,
    public instanceChangedId: string,
    public instanceId: string,
    public language: Array<string>,
    public metaId: string,
    public operation: string,
    public organization: Organization,
    public person: Person,
    public role: string,
    public state: State,
    public telephone: Array<string>,
    public toBeDelete: string,
    public uid: string,
    public version: string,
  ) {}
}

type Organization = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};

type Person = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};
