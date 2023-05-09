import { Entity } from 'src/utility/enums/entity.enum';

export class Operation {
  constructor(public entityType: Entity, public instanceId: string, public metaId: string, public uid: string) {}
}
