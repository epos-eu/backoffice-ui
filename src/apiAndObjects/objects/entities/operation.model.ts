import { Mapping } from '../types/mapping.type';

export class Operation {
  constructor(
    public fileProvenance: string,
    public mapping: Mapping[],
    public method: string,
    public returns: string[],
    public template: string,
    public uid: string,
  ) {}
}
