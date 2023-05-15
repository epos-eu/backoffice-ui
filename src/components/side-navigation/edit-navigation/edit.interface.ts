import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';
import { Entity } from 'src/utility/enums/entity.enum';

export interface IChangeItem {
  type: Entity;
  label: string;
  status: Status;
  color: string;
  id: string;
}
