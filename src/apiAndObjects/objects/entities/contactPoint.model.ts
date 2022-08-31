import { SectionName } from 'src/utility/enums/sectionName.enum';
import { State } from 'src/utility/enums/state.enum';
export class ContactPoint {
  constructor(
    public uid: string,
    public instanceId: string,
    public entityType?: SectionName,
    public changeTimestamp?: string,
    public editorId?: string,
    public state?: State,
    public toBeDelete?: string,
    public email?: string[],
    public fileProvenance?: string,
    public language?: Array<string>,
    public person?: Record<string, unknown>,
    public role?: string,
    public telephone?: string[],
  ) {}
}
