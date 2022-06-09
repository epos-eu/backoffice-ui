import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/services/dialog.service';

export interface PeriodicElement {
  name: string;
  size: number;
}
export interface UploadElement {
  name: string;
  verified: boolean;
}
export interface ImportElement {
  name: string;
  verified: boolean;
  approval: boolean;
  importDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Metadata File', size: 1.0079 },
  { name: 'Metadata File', size: 4.0026 },
  { name: 'Metadata File', size: 6.941 },
  { name: 'Metadata File', size: 9.0122 },
  { name: 'Metadata File', size: 10.811 },
  { name: 'Metadata File', size: 12.0107 },
];

const UPLOADED_DATA: UploadElement[] = [
  { name: 'Metadata File', verified: true },
  { name: 'Metadata File', verified: true },
  { name: 'Metadata File', verified: true },
  { name: 'Metadata File', verified: false },
  { name: 'Metadata File', verified: false },
  { name: 'Metadata File', verified: false },
];

const IMPORTED_DATA: ImportElement[] = [
  { name: 'Metadata File', approval: false, verified: true, importDate: '13/06/2022' },
  { name: 'Metadata File', approval: false, verified: true, importDate: '13/06/2022' },
  { name: 'Metadata File', approval: false, verified: true, importDate: '13/06/2022' },
  { name: 'Metadata File', approval: false, verified: true, importDate: '13/06/2022' },
  { name: 'Metadata File', approval: false, verified: true, importDate: '13/06/2022' },
  { name: 'Metadata File', approval: false, verified: true, importDate: '13/06/2022' },
];
@Component({
  selector: 'app-new-import',
  templateUrl: './new-import.component.html',
  styleUrls: ['./new-import.component.scss'],
})
export class NewImportComponent {
  displayedColumns: string[] = ['name', 'size'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  uploadDisplayedColumns: string[] = ['name', 'verifying'];
  uploadDataSource = [...UPLOADED_DATA];

  importDisplayedColumns: string[] = ['name', 'verified', 'approval', 'importDate'];
  importDataSource = [...IMPORTED_DATA];

  @ViewChild(MatTable) table!: MatTable<UploadElement>;
  public selectedItems = false;
  public uploading = false;
  public uploaded = false;
  public importEnabled = false;
  public integrityChecked = false;

  constructor(private dialogService: DialogService) {}

  public fileSelectionToggle(): void {
    this.selectedItems = !this.selectedItems;
  }

  public addData() {
    this.selectedItems = true;
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.data.push(ELEMENT_DATA[randomElementIndex]);
    if (null != this.table) {
      this.table.renderRows();
    }
  }

  public startUpload() {
    this.selectedItems = false;
    this.uploading = true;
    setTimeout(() => {
      this.uploaded = true;
      this.uploading = false;
      setTimeout(() => {
        UPLOADED_DATA.map((item: UploadElement) => (item.verified = true));
        this.importEnabled = true;
      }, 3000);
    }, 3000);
  }

  public showImport() {
    this.integrityChecked = true;
    this.uploading = false;
    this.uploaded = false;
    UPLOADED_DATA.slice(3, 6).map((item: UploadElement) => (item.verified = false));
  }

  public openDataPopup() {
    this.dialogService.openMetadateViewDialog();
  }
}
