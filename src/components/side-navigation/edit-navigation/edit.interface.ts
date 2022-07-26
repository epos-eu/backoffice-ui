import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';

export interface IChangeItem {
  type: string;
  label: string;
  status: Status;
  color: string;
  id: string;
}
