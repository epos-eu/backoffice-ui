import { Mapping } from '../types/mapping.type';

export class Operation {
  constructor(
    public instanceId: string,
    public changeTimestamp: string,
    public state: string,
    public toBeDelete: string,
    public uid: string,
    public fileProvenance: string,
    public method: string,
    public returns: Array<string>,
    public template: string,
    public mapping: Array<Mapping>,
  ) {}
}
