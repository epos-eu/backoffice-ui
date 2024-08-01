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
import { Identifier, LinkedEntity } from 'generated/backofficeSchemas';
import { debounceTime } from 'rxjs';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { Status } from 'src/utility/enums/status.enum';
import { DataproductService } from '../../dataproduct.service';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { GetIdentifierDetailsParams } from 'src/apiAndObjects/api/identifier/getIdentifier';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-persistent-identifier',
  templateUrl: './persistent-identifier.component.html',
  styleUrl: './persistent-identifier.component.scss',
})
export class PersistentIdentifierComponent implements OnInit {
  constructor(
    private entityExecutionService: EntityExecutionService,
    private dataproductService: DataproductService,
    private apiService: ApiService,
  ) {}

  @Input() dataProduct!: DataProduct;

  public formGroup!: UntypedFormGroup;

  public stateEnum = Status;

  public floatLabelControl = new UntypedFormControl('auto');

  public identifiers: Array<Identifier> = [];

  get identifierArray() {
    return this.formGroup.get('identifier') as UntypedFormArray;
  }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      identifier: this.createIdentifierArray(this.dataProduct?.identifier),
    });
    // this.trackFormChanges();
  }

  // private trackFormChanges(): void {
  //   const updatingObject = this.entityExecutionService.getActiveDataProductValue() || {};
  //   this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
  //     this.dataproductService.updateDataProductRecord(updatingObject, { identifier: changes.identifier });
  //   });
  // }

  private createIdentifierArray(identifier?: Identifier[] | undefined): UntypedFormArray {
    const arr = new UntypedFormArray([]);
    identifier?.forEach((item: LinkedEntity) => {
      const identifierParams: GetIdentifierDetailsParams = {
        metaId: item.metaId!,
        instanceId: item.instanceId!,
      };
      this.apiService.endpoints.Identifier.get.call(identifierParams).then((item: Identifier[]) => {
        this.identifiers.push(item[0]);
        arr.push(
          new FormGroup({
            identifier: new FormControl(item[0].identifier, [Validators.required]),
            type: new FormControl(item[0].type, [Validators.required]),
          }),
        );
      });
    });
    return arr;
  }

  public handleAddIdentifier(): void {
    this.apiService.endpoints.Identifier.create.call().then((item: Identifier) => {
      console.debug(item);
      this.identifiers.push(item);
      const linkedEntity: LinkedEntity = {
        instanceId: item.instanceId,
        metaId: item.metaId,
        entityType: Entity.IDENTIFIER,
        uid: item.uid,
      };
      const updatingObject = this.entityExecutionService.getActiveDataProductValue() || {};
      const identifierArr = updatingObject.identifier!;
      identifierArr.push(linkedEntity);
      this.dataproductService.updateDataProductRecord(updatingObject, { identifier: identifierArr });

      this.identifierArray.push(
        new FormGroup({
          identifier: new FormControl('', [Validators.required]),
          type: new FormControl('', [Validators.required]),
        }),
      );
    });
  }

  public handleDeleteIdentifier(index: number): void {
    const itemToDelete = this.identifiers[index];
    this.apiService.deleteEntity(EntityEndpointValue.IDENTIFIER, itemToDelete.instanceId!).then(() => {
      const identifierArr = this.formGroup.get('identifier') as FormArray;
      identifierArr.removeAt(index);
      this.identifiers.splice(index, 1);

      const updatingObject = this.entityExecutionService.getActiveDataProductValue() || {};
      console.debug('dataprod:', updatingObject);
      const newIdentifierArr = updatingObject.identifier?.splice(index, 1);
      this.dataproductService.updateDataProductRecord(updatingObject, { identifier: newIdentifierArr });
    });
  }

  public handleUpdateIdentifier(index: number): void {}

  public getControls(field: string) {
    return (this.formGroup.get(field) as FormArray).controls;
  }
}
