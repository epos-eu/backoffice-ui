import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { SectionsService } from 'src/services/sections.service';
import { SectionName } from 'src/utility/enums/sectionName.enum';
import { SectionItem } from 'src/utility/objects/login/sectionItem';
import { Sections } from 'src/utility/objects/login/sections';

@Component({
  selector: 'app-browse-users',
  templateUrl: './browse-users.component.html',
  styleUrls: ['./browse-users.component.scss'],
})
export class BrowseUsersComponent implements OnInit {
  public displayedColumns = ['name', 'surname', 'email', 'role'];
  public dataSource!: MatTableDataSource<TableUserDetail>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sectionsService: SectionsService, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.loading = true;
    this.sectionsService.sectionsObservable.subscribe((sections: Array<Sections>) => {
      this.createUserTableObjects(sections);
    });
  }

  public rowClicked(row: TableUserDetail): void {
    this.dialogService.openChangeUserRoleDialog(row).then((data: DialogData) => {
      if (data.dataOut) {
        this.loading = true;
        this.sectionsService.forceSectionDataUpdate();
      }
    });
  }

  private createUserTableObjects(sections: Array<Sections>) {
    const tableDetails = new Array<TableUserDetail>();
    const dataProducts = sections.filter((item) => item.sectionName === SectionName.USER).pop();
    if (dataProducts) {
      dataProducts.items.forEach((item: SectionItem) => {
        const detail: TableUserDetail = {
          name: item.cells[0].value,
          surname: item.cells[1].value,
          email: item.cells[2].value,
          role: item.cells[3].value,
          instanceId: item.instanceId,
        };
        tableDetails.push(detail);
      });
      this.initialiseUserTable(tableDetails);
    }
  }

  private initialiseUserTable(details: Array<TableUserDetail>) {
    this.dataSource = new MatTableDataSource(details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }
}
export interface TableUserDetail {
  name: string;
  surname: string;
  email: string;
  role: string;
  instanceId: string;
}
