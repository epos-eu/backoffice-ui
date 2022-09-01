import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';

export function initEmptyContactObj(): ContactPoint {
  return new ContactPoint('test@example.com', '', undefined, '', '', undefined, '');
}
