import { Entity } from 'src/utility/enums/entity.enum';

export type Affiliation = {
  instanceId: string;
  uid: string;
  metaId: string;
  entityType: Entity;
};
