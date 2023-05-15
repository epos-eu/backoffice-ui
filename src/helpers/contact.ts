import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';

export function initEmptyContactObj(): ContactPoint | unknown {
  const contact: unknown = {};
  // return new ContactPoint('test@example.com', '', undefined, '', '', undefined, '');
  return contact;
}
