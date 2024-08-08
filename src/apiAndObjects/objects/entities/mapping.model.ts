import { Group, Mapping as MappingType } from 'generated/backofficeSchemas';
import { Status } from 'src/utility/enums/status.enum';

export class Mapping implements MappingType {
  constructor(
    public changeComment?: string,
    public changeTimestamp?: string,
    public defaultValue?: string,
    public editorId?: string,
    public fileProvenance?: string,
    public groups?: Group[],
    public instanceChangedId?: string,
    public instanceId?: string,
    public label?: string,
    public maxValue?: string,
    public metaId?: string,
    public minValue?: string,
    public multipleValues?: string,
    public operation?: string,
    public paramValue?: string[],
    public property?: string,
    public range?: string,
    public readOnlyValue?: string,
    public required?: string,
    public status?: Status,
    public toBeDelete?: string,
    public uid?: string,
    public valuePattern?: string,
    public variable?: string,
    public version?: string,
    public versionId?: string,
  ) {}
}
