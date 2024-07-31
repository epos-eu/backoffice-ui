import { Component, Input, OnInit } from '@angular/core';
import { FormatTypes } from '../formats';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Distribution } from 'generated/backofficeSchemas';
import { HelpersService } from 'src/services/helpers.service';

@Component({
  selector: 'app-distribution-download',
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DistributionDownloadComponent implements OnInit {
  @Input() urlInvalid: boolean | undefined = false;

  @Input() distribution!: Distribution;

  constructor(private formBuilder: FormBuilder, private helpersService: HelpersService) {}

  public formats = FormatTypes;

  public form!: FormGroup;

  private initForm(): void {
    this.form = this.formBuilder.group({
      format: new FormControl(this.distribution?.format),
      downloadURL: new FormControl(this.distribution?.downloadURL, [
        Validators.required,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (control: AbstractControl): { [key: string]: any } | null => {
          if (this.helpersService.isValidHttpUrl(control.value)) {
            return null;
          } else {
            control.markAsTouched();
            return { 'error-class': control.value };
          }
        },
      ]),
    });
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
