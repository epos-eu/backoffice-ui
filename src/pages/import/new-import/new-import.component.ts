import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  size: number;
}
export interface UploadElement {
  name: string;
  field1: number;
  verified: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Metadata File', size: 1.0079 },
  { name: 'Metadata File', size: 4.0026 },
  { name: 'Metadata File', size: 6.941 },
  { name: 'Metadata File', size: 9.0122 },
  { name: 'Metadata File', size: 10.811 },
  { name: 'Metadata File', size: 12.0107 },
  { name: 'Metadata File', size: 14.0067 },
  { name: 'Metadata File', size: 15.9994 },
  { name: 'Metadata File', size: 18.9984 },
  { name: 'Metadata File', size: 20.1797 },
];

const UPLOADED_DATA: UploadElement[] = [
  { name: 'Metadata File', field1: 1, verified: true },
  { name: 'Metadata File', field1: 26, verified: true },
  { name: 'Metadata File', field1: 1, verified: true },
  { name: 'Metadata File', field1: 9, verified: false },
  { name: 'Metadata File', field1: 10, verified: false },
  { name: 'Metadata File', field1: 12, verified: false },
  { name: 'Metadata File', field1: 14, verified: false },
  { name: 'Metadata File', field1: 15, verified: false },
  { name: 'Metadata File', field1: 18, verified: false },
  { name: 'Metadata File', field1: 20, verified: false },
];
@Component({
  selector: 'app-new-import',
  templateUrl: './new-import.component.html',
  styleUrls: ['./new-import.component.scss'],
})
export class NewImportComponent {
  displayedColumns: string[] = ['name', 'size'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  uploadDisplayedColumns: string[] = ['name', 'size', 'verifying'];
  uploadDataSource = [...UPLOADED_DATA];
  @ViewChild(MatTable) table!: MatTable<UploadElement>;
  public selectedItems = false;
  public uploading = false;
  public uploaded = false;
  public importEnabled = false;

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
}
