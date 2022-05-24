import { ComponentType } from '@angular/cdk/portal';
import { ContactPoint } from 'src/api/models/entities/contactPoint.model';
import { Person } from 'src/api/models/entities/person.model';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DialogAddPersonComponent } from '../dialog-add-person/dialog-add-person.component';

export interface IDialog {
  component: ComponentType<DialogDeleteComponent | DialogAddPersonComponent>;
  content: Person | ContactPoint;
}

export type DialogTypes = DialogDeleteComponent | DialogAddPersonComponent;
