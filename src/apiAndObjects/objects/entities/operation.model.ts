import { DataProduct, LinkedEntity } from 'generated/backofficeSchemas';

export class Operation {
  constructor(
    public changeComment?: string,
    public changeTimestamp?: string,
    public editorId?: string,
    public fileProvenance?: string,
    public groups?: Array<LinkedEntity>,
    public instanceChangedId?: string,
    public instanceId?: string,
    public mapping?: Array<LinkedEntity>,
    public maturity?: Array<LinkedEntity>,
    public metaId?: string,
    public method?: string,
    public operation?: string,
    public returns?: Array<string>,
    public state?: DataProduct['status'],
    public template?: string,
    public toBeDelete?: string,
    public uid?: string,
    public version?: string,
    public versionId?: string,
  ) {}
}
