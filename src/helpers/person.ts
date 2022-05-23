import { Person } from 'src/api/models/entities/person.model';

export function initEmptyPersonObj(): Person {
  return new Person(
    {
      country: '',
      locality: '',
      postalCode: '',
      street: '',
    },
    [''],
    '',
    [''],
    '',
    '',
    '',
    [
      {
        identifier: '',
        type: '',
      },
    ],
    [''],
    [''],
    '',
  );
}
