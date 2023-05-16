import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { SnackbarService } from 'src/services/snackbar.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

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
  public entityRoute = EntityEndpointValue.DISTRIBUTION;

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

  public handleCreate(): void {
    this.loading = true;
    const item: Distribution = {
      uid: this.form.value['uid'],
      modified: new Date().toISOString(),
    };

    this.apiService.endpoints.Distribution.create
      .call(item)
      .then((value: DistributionDetailDataSource) => {
        this.router.navigate([`/browse/${EntityEndpointValue.DISTRIBUTION}/details`, value.instanceId]);
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
