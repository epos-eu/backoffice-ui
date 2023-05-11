import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/distributionDetailDataSource';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { SnackbarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-create-distribution-item',
  templateUrl: './create-distribution-item.component.html',
  styleUrls: ['./create-distribution-item.component.scss'],
})
export class CreateDistributionItemComponent implements OnInit {
  public form!: UntypedFormGroup;
  public distribution!: DistributionDetailDataSource | undefined;
  public floatLabelControl = new UntypedFormControl('auto');
  public loading = false;

  public enableSave = false;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.trackFormData();
  }

  public handleBack(): void {
    this.router.navigate(['/browse/distribution']);
  }

  public handleCreate(): void {
    this.loading = true;
    const item: Distribution = {
      uid: this.form.value['uid'],
      modified: new Date().toISOString(),
    };

    this.apiService.endpoints.Distribution.create
      .call(item)
      .then((value: { uid: string; instanceId: string }) => {
        this.router.navigate(['/browse/distribution/details', value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Distribution`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      )
      .finally(() => (this.loading = false));
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.distribution?.uid,
    });
    this.form.valueChanges.subscribe(() => {
      this.enableSave = this.form.valid;
    });
  }
}
