import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';

@Component({
  selector: 'app-browse-data-products-item',
  templateUrl: './browse-data-products-item.component.html',
  styleUrls: ['./browse-data-products-item.component.scss'],
})
export class BrowseDataProductsItemComponent implements OnInit, OnDestroy {
  public floatLabelControl = new FormControl('auto');
  public dataProduct!: DataProduct;
  public currentEdit!: IChangeItem;
  public form!: FormGroup;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private actionService: ActionsService,
    private formBuilder: FormBuilder,
  ) {
    this.dataProduct = this.router.getCurrentNavigation()?.extras.state as DataProduct;
  }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.actionService.cancelLiveEdit();
  }

  private initData(): void {
    if (this.dataProduct) {
      this.actionService.setLiveEdit();
      this.actionService.addEditedItems([
        {
          type: 'data-products',
          label: 'Data product',
          status: Status.Draft,
          color: 'draft',
          id: this.dataProduct.uid,
        },
      ]);
      this.actionService.trackCurrentEdit(this.dataProduct.uid);
      this.actionService.currentEditObservable.subscribe((item: IChangeItem) => {
        if (item) {
          this.currentEdit = item;
        }
      });
      this.trackFormData();
    }
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.dataProduct.uid,
      title: this.dataProduct.title,
      description: this.dataProduct.description[0],
      distributionUid: '',
      distributionTitle: '',
      webserviceUid: '',
      webserviceTitle: '',
    });
    this.form.valueChanges.subscribe((changes) => {
      console.log(changes === this.form.value);
    });
  }

  public handleGetRevisions(): void {
    // Todo: get
    this.dialogService.openDialogForComponent(RevisionsComponent, {}, '50vw', '70vh');
  }

  public handleDelete(): void {
    // Todo: delete item from DB
    this.dialogService.handleDelete();
  }
}
