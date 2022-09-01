import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SectionsService } from 'src/services/sections.service';
import { SectionName } from 'src/utility/enums/sectionName.enum';
import { SectionItem } from 'src/utility/objects/login/sectionItem';
import { Sections } from 'src/utility/objects/login/sections';

@Component({
  selector: 'app-browse-web-services',
  templateUrl: './browse-web-services.component.html',
  styleUrls: ['./browse-web-services.component.scss'],
})
export class BrowseWebServicesComponent implements OnInit {
  public displayedColumns: string[] = [];
  public dataSource!: MatTableDataSource<SectionItem>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sectionsService: SectionsService) {}

  public ngOnInit(): void {
    this.sectionsService.sectionsObservable.subscribe((sections: Array<Sections>) => {
      const webservice = sections.filter((item) => item.sectionName === SectionName.WEBSERVICE);

      this.displayedColumns = webservice[0].columns.map((item) => item.columnLabel);
      this.dataSource = new MatTableDataSource(webservice[0].items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
