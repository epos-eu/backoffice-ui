import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-groups',
  templateUrl: './browse-groups.component.html',
  styleUrls: ['./browse-groups.component.scss'],
})
export class BrowseGroupsComponent implements AfterViewInit {
  constructor(private apiService: ApiService) {}

  public displayedColumns: string[] = ['id', 'name', 'description'];
  public dataSource: MatTableDataSource<Group> = new MatTableDataSource();
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private initData(): void {
    this.apiService.endpoints[Entity.GROUP].getAll.call().then((groups: Group[]) => {
      const filtered = groups.filter((group: Group) => group.id !== '');
      if (filtered.length === 0) {
        this.dataSource.data = [
          {
            id: '1',
            name: 'Tsunami',
            description: '...',
          },
          {
            id: '2',
            name: 'Volcanology',
            description: '...',
          },
          {
            id: '3',
            name: 'Seismology',
            description: '...',
          },
        ];
      } else {
        this.dataSource.data = groups;
      }
    });
  }

  public ngOnInit(): void {
    this.initData();
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource([] as Array<Group>);
  }
}
