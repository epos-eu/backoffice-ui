import { State } from 'src/utility/enums/state.enum';
import { AccessService } from '../types/accessService.type';
export class Distribution {
  constructor(
    public instanceId: string,
    public changeTimestamp: moment.Moment | undefined,
    public state: State,
    public toBeDelete: string,
    public uid: string,
    public fileProvenance: string,
    public accessService: AccessService,
    public accessURL: Array<string>,
    public description: Array<string>,
    public downloadURL: Array<string>,
    public format: string,
    public issued: moment.Moment | undefined | null,
    public modified: string,
    public title: Array<string>,
    public type: string,
  ) {}
}
