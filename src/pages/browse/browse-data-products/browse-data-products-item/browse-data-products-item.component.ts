import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { DialogService } from 'src/components/dialogs/dialog.service';
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

  constructor(private router: Router, private dialogService: DialogService, private actionService: ActionsService) {
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
          status: 'Draft',
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
    }
  }

  public handleGetRevisions(): void {
    // Todo: get revisions
  }

  public handleDelete(): void {
    // Todo: delete item from DB
    this.dialogService.handleDelete();
  }
}
