import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-operation-parameters',
  templateUrl: './operation-parameters.component.html',
  styleUrls: ['./operation-parameters.component.scss'],
})
export class OperationParametersComponent implements OnInit {
  @Input() instanceId = '';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  public paramsForm!: UntypedFormGroup;

  private watchFormChanges(changes: any): void {
    console.log(changes);
  }

  private initData(): void {
    if (this.instanceId) {
      this.apiService.endpoints[Entity.OPERATION].get
        .call({ instanceId: this.instanceId }, false)
        .then((data: Array<OperationDetailDataSource>) => {
          console.log(data);
        });
    }
  }

  private initForm(): void {
    this.paramsForm = this.formBuilder.group({
      label: [''],
    });
    this.paramsForm.valueChanges.subscribe((changes) => this.watchFormChanges(changes));
  }

  public ngOnInit(): void {
    this.initData();
    this.initForm();
  }
}
