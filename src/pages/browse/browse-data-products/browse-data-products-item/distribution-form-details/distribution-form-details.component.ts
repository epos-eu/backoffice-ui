import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

@Component({
  selector: 'app-distribution-form-details',
  templateUrl: './distribution-form-details.component.html',
  styleUrls: ['./distribution-form-details.component.scss'],
})
export class DistributionFormDetailsComponent implements OnInit {
  @Input() distributionDetails: EntityDetail | undefined;

  public floatLabelControl = new UntypedFormControl('auto');
  public distribution!: DistributionDetailDataSource | undefined;
  public UID!: string | null;
  public form!: UntypedFormGroup;
  public entityRoute = EntityEndpointValue.DISTRIBUTION;

  constructor(
    private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private persistorService: PersistorService,
  ) {}

  ngOnInit(): void {
    if (this.distributionDetails) {
      this.initData(this.distributionDetails?.instanceId);
    }
  }

  private initData(id: string): void {
    this.apiService.endpoints.Distribution.get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.distribution = data.shift();
          if (this.distribution) {
            this.trackFormData();
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      instanceId: this.distribution?.instanceId,
      uid: this.distribution?.uid,
      title: this.distribution?.title,
      description: this.distribution?.description,
      changeTimestamp: this.distribution?.changeTimestamp,
      state: this.distribution?.state,
      modified: this.distribution?.modified,
    });
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.distribution?.metaId,
      },
      '35vw',
      'auto',
      'revisions-dialog',
    );
  }

  public handleSave(): void {
    this.form.value['description'] = [this.form.value['description']];
    this.form.value['title'] = [this.form.value['title']];
    this.apiService.endpoints.Distribution.update
      .call(this.form.value as Distribution)
      .then((data: DistributionDetailDataSource) => {
        const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
        if (localStorage !== null) {
          const entityDetail: EntityDetail = {
            entityType: 'distribution',
            metaId: data.metaId,
            uid: data.uid,
            instanceId: data.instanceId,
          };
          const formData: DataProduct = JSON.parse(localStorage);
          formData.distribution?.push(entityDetail);
          this.persistorService.setValueInStorage(
            StorageType.LOCAL_STORAGE,
            StorageKey.FORM_DATA,
            JSON.stringify(formData),
          );
        }
      });
  }
}
