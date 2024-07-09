/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  UntypedFormControl,
  UntypedFormGroup,
  UntypedFormArray,
} from '@angular/forms';
import { Identifier } from 'generated/backofficeSchemas';
import { debounceTime } from 'rxjs';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { Status } from 'src/utility/enums/status.enum';
import { DataproductService } from '../../dataproduct.service';

@Component({
  selector: 'app-persistent-identifier',
  templateUrl: './persistent-identifier.component.html',
  styleUrl: './persistent-identifier.component.scss',
})
export class PersistentIdentifierComponent implements OnInit {
  constructor(private entityExecutionService: EntityExecutionService, private dataproductService: DataproductService) {}

  @Input() dataProduct!: DataProduct;

  public formGroup!: UntypedFormGroup;

  public stateEnum = Status;

  public floatLabelControl = new UntypedFormControl('auto');

  get identifierArray() {
    return this.formGroup.get('identifier') as UntypedFormArray;
  }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      identifier: this.createIdentifierArray(this.dataProduct?.identifier),
    });
    this.trackFormChanges();
  }

  private trackFormChanges(): void {
    const updatingObject = this.entityExecutionService.getActiveDataProductValue() || {};
    this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
      this.dataproductService.updateDataProductRecord(updatingObject, { identifier: changes.identifier });
    });
  }

  private createIdentifierArray(identifier?: Identifier[] | undefined): UntypedFormArray {
    const arr = new UntypedFormArray([]);
    identifier?.forEach((item) => {
      arr.push(
        new FormGroup({
          identifier: new FormControl(item?.identifier, [Validators.required]),
          type: new FormControl(item?.type, [Validators.required]),
        }),
      );
    });
    return arr;
  }

  public handleAddIdentifier(): void {
    this.identifierArray.push(
      new FormGroup({
        identifier: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
      }),
    );
  }

  public handleDeleteIdentifier(index: number): void {
    const identifier = this.formGroup.get('identifier') as FormArray;
    identifier.removeAt(index);
  }

  public getControls(field: string) {
    return (this.formGroup.get(field) as FormArray).controls;
  }
}
