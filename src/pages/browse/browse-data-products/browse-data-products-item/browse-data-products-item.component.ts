import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  // public dataProduct!: DataProduct;
  public UID!: string | null;
  public currentEdit!: IChangeItem;
  public form!: FormGroup;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private actionService: ActionsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    // this.dataProduct = this.router.getCurrentNavigation()?.extras.state as DataProduct;
    // this.UID = this.router.getCurrentNavigation()?.extras.state;
    // console.log(this.router.getCurrentNavigation()?.extras.state);
    this.UID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.actionService.cancelLiveEdit();
  }

  private initData(): void {
    // if (this.dataProduct) {
    //   this.actionService.setLiveEdit();
    //   this.actionService.addEditedItems([
    //     {
    //       type: 'data-products',
    //       label: 'Data product',
    //       status: Status.Draft,
    //       color: 'draft',
    //       id: this.dataProduct.uid,
    //     },
    //   ]);
    //   this.actionService.trackCurrentEdit(this.dataProduct.uid);
    //   this.actionService.currentEditObservable.subscribe((item: IChangeItem) => {
    //     if (item) {
    //       this.currentEdit = item;
    //     }
    //   });
    //   this.trackFormData();
    // }
    this.actionService.setLiveEdit();
    this.actionService.addEditedItems([
      {
        type: 'data-products',
        label: 'Data product',
        status: Status.Draft,
        color: 'draft',
        id: 'Test!',
      },
    ]);
    this.trackFormData();
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.UID,
      title: '',
      description: '',
      distributionUid: '',
      distributionTitle: '',
      webserviceUid: '',
      webserviceTitle: '',
    });
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(RevisionsComponent, {}, '50vw', '70vh');
  }

  public handleDelete(): void {
    // Todo: delete item from DB
    this.dialogService.handleDelete();
  }
}
