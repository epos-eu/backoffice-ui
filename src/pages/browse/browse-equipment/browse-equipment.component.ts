import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { EquipmentDataSource } from 'src/apiAndObjects/objects/equipmentDataSource';

@Component({
  selector: 'app-browse-equipment',
  templateUrl: './browse-equipment.component.html',
  styleUrls: ['./browse-equipment.component.scss'],
})
export class BrowseEquipmentComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'name'];
  public dataSource!: MatTableDataSource<EquipmentDataSource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.endpoints.equipment.getEquipments.call().then((data: Array<EquipmentDataSource>) => {
      this.dataSource = new MatTableDataSource(data as Array<EquipmentDataSource>);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
