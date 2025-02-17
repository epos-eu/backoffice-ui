/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkedEntity, Mapping, Operation, WebService } from 'generated/backofficeSchemas';
import { Subject, Subscription } from 'rxjs';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';

@Component({
  selector: 'app-supported-operation',
  templateUrl: './supported-operation.component.html',
  styleUrl: './supported-operation.component.scss',
})
export class SupportedOperationComponent implements OnInit {
  @Input() supportedOperations!: LinkedEntity[] | undefined;
  @Input() webservice: WebService | undefined;
  @Input() disableFeatures!: boolean;

  public mappingSrc = new Subject<Array<Mapping>>();
  public templateSrc = new Subject<string>();
  private mapping: Array<Mapping> = [];
  private subscriptions: Array<Subscription> = [];

  constructor(
    private formBuilder: FormBuilder,
    private entityExecutionService: EntityExecutionService,
    private dialogService: DialogService,
  ) {
    this.initSubscriptions();
  }

  public form!: FormGroup;

  private initSubscriptions(): void {
    this.subscriptions.push(
      this.mappingSrc.subscribe((mapArr: Array<Mapping>) => {
        this.mapping = mapArr;
      }),
      this.templateSrc.subscribe((val: string) => {
        this.handleTemplate(val);
      }),
    );
  }

  private mapParams(submatch: string, paramName: string): string | null {
    const match = this.mapping.find((param: Mapping) => param.variable === paramName);
    if (match) {
      const regex = new RegExp(`${paramName}`, 'g');
      if (match.defaultValue) {
        if (match.range === OperationParamsRange.DATE_TIME) {
          // get only the date from datetime string
          const dateStr = match.defaultValue.split('T').shift();
          if (dateStr) {
            submatch = submatch.replace(regex, paramName + '=' + encodeURIComponent(dateStr));
          }
        } else {
          submatch = submatch.replace(regex, paramName + '=' + encodeURIComponent(match.defaultValue));
        }
      } else {
        submatch = '';
      }
    }
    return submatch;
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      template: new FormControl({ value: '', disabled: false }, [Validators.required]),
      preview: new FormControl(''),
    });
    this.form.get('template')?.valueChanges.subscribe((changes: string) => this.updateTemplate(changes));
  }

  public handleCreateURIPreview(): void {
    const template = this.form.get('template')?.value;
    const templateWhiteSpaceRemove = template.replace(/\s/g, '');
    if (templateWhiteSpaceRemove) {
      const templateParams = templateWhiteSpaceRemove.match(/\{(.*?)\}/);

      let submatch = templateParams[1];
      const paramsArr = submatch.replace('?', '').split(',');
      if (paramsArr.length > 0 && this.mapping.length > 0) {
        paramsArr.forEach((paramName: string) => {
          const checkNullValue = this.mapParams(submatch, paramName);
          if (checkNullValue) {
            submatch = this.mapParams(submatch, paramName);
          }
        });
        submatch = submatch.replace(/,/g, '&');
        const finalTemplateURI = templateWhiteSpaceRemove.split('{').shift() + `${submatch}`;
        this.form.get('preview')?.setValue(finalTemplateURI);
      }
    }
  }

  public handleAddOperation(): void {
    const webserviceEtityDetail: LinkedEntity = {
      entityType: Entity.WEBSERVICE,
      instanceId: this.webservice?.instanceId ?? '',
      uid: this.webservice?.uid ?? '',
      metaId: this.webservice?.metaId ?? '',
    };
    this.dialogService.handleAddWebserviceOperation(webserviceEtityDetail).then((result: Operation | unknown) => {
      // put result on supportedOperation array (first position and focused)
      const newOperation = result as Operation;
      const operation: LinkedEntity = {
        entityType: Entity.OPERATION,
        instanceId: newOperation.instanceId,
        uid: newOperation.uid,
        metaId: newOperation.metaId,
      };
      // Sets 'accessURL' on Distribution to newly created Operation.
      const activeDistribution = this.entityExecutionService.getActiveDistributionValue();
      // activeDistribution?.accessURL?.push(operation);
      if (activeDistribution != null) {
        this.entityExecutionService.setActiveDistribution(activeDistribution);
        // this.actionsService.showSaveDistributionMessage(true);
      }
      this.entityExecutionService.getActiveWebServiceValue();
      this.webservice?.supportedOperation?.unshift(operation);
      // this.entityExecutionService.handleWebserviceSave();
      // this.supportedOperationFocusFirstRow = true;
    });
  }

  public handleTemplate(template: string): void {
    this.form.get('template')?.setValue(template);
  }

  public updateTemplate(template: string) {
    const activeSupportedOperation = this.entityExecutionService.getActiveOperationValue();
    if (null != activeSupportedOperation) {
      activeSupportedOperation.template = template;
      this.entityExecutionService.setActiveOperation(activeSupportedOperation);
    }
  }

  public supportedOperationSearch(event: any): void {
    // const value = event.target.value;
    // if (value.length > 1) {
    //   const supportedOperation = this.webservice?.supportedOperation ?? [];
    //   const foundIndex = supportedOperation.findIndex((operation) =>
    //     operation.uid?.toUpperCase().includes(value.toUpperCase()),
    //   );
    //   if (foundIndex > -1) {
    //     this.supportedOperationFocusFirstRow = true;
    //     supportedOperation.push(...supportedOperation.splice(0, foundIndex));
    //   } else {
    //     this.supportedOperationFocusFirstRow = false;
    //   }
    // } else {
    //   this.supportedOperationFocusFirstRow = false;
    // }
  }
}
