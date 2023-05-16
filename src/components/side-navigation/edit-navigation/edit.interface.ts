import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { State } from 'src/utility/enums/state.enum';

export interface IChangeItem {
  type: Entity;
  route: EntityEndpointValue;
  label: string;
  state: State;
  color: string;
  id: string;
}
