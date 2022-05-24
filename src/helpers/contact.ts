import { ContactPoint } from 'src/api/models/entities/contactPoint.model';

export function initEmptyContactObj(): ContactPoint {
  return new ContactPoint(['test@example.com'], '', '', '', '', [''], '');
}
