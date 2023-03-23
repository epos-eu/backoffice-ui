import { Entity } from 'src/utility/enums/entity.enum';

export type AccessService = {
  instanceId: string;
  uid: string;
  entityType: Entity;
};
