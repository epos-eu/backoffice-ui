import { ComponentType } from '@angular/cdk/portal';
import { ContactPoint } from 'src/api/models/entities/containtPoint.model';
import { Person } from 'src/api/models/entities/person.model';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';

export interface IDialog {
  component: ComponentType<DialogDeleteComponent | DialogFormComponent>;
  content: Person | ContactPoint;
}

export type DialogTypes = DialogDeleteComponent | DialogFormComponent;
