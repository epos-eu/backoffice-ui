/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkedEntity } from 'generated/backofficeSchemas';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';

@Component({
  selector: 'app-supported-operation',
  templateUrl: './supported-operation.component.html',
  styleUrl: './supported-operation.component.scss',
})
export class SupportedOperationComponent implements OnInit {
  @Input() supportedOperations: string[] | undefined = [];

  constructor(private formBuilder: FormBuilder) {}

  private mapping: Array<any> = [];

  public form!: FormGroup;

  private mapParams(submatch: string, paramName: string): string {
    // const match = this.mapping.find((param: LinkedEntity) => param.variable === paramName);
    // if (match) {
    //   const regex = new RegExp(`${paramName}`, 'g');
    //   if (match.defaultValue) {
    //     if (match.range === OperationParamsRange.DATE_TIME) {
    //       // get only the date from datetime string
    //       const dateStr = match.defaultValue.split('T').shift();
    //       if (dateStr) {
    //         submatch = submatch.replace(regex, paramName + '=' + encodeURIComponent(dateStr));
    //       }
    //     } else {
    //       submatch = submatch.replace(regex, paramName + '=' + encodeURIComponent(match.defaultValue));
    //     }
    //   } else {
    //     submatch = '';
    //   }
    // }
    // return submatch;
    return '';
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      template: new FormControl({ value: '', disabled: true }, [Validators.required]),
      preview: new FormControl(''),
    });
  }

  public handleCreateURIPreview(): void {
    const template = this.form.get('template')?.value;
    if (template) {
      const templateParams = template.match(/\{(.*?)\}/);
      let submatch = templateParams[1];
      const paramsArr = submatch.replace('?', '').split(',');
      if (paramsArr.length > 0 && this.mapping.length > 0) {
        paramsArr.forEach((paramName: string) => {
          submatch = this.mapParams(submatch, paramName);
        });
        submatch = submatch.replace(/,/g, '&');
        const finalTemplateURI = template.split('{').shift() + `${submatch}`;
        this.form.get('preview')?.setValue(finalTemplateURI);
      }
    }
  }

  public handleAddOperation(): void {
    //
  }
}
