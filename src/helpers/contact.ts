import { ContactPoint } from 'src/api/models/entities/containtPoint.model';

export function initEmptyContactObj(): ContactPoint {
  return new ContactPoint(['test@example.com'], '', '', '', '', [''], '');
}
