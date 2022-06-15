import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataProductDataSource } from 'src/apiAndObjects/objects/dataProductDataSource';
import { DataProductsService } from 'src/services/data-products.service';

@Component({
  selector: 'app-browse-data-products',
  templateUrl: './browse-data-products.component.html',
  styleUrls: ['./browse-data-products.component.scss'],
})
export class BrowseDataProductsComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'name', 'description', 'type'];
  public dataSource!: MatTableDataSource<DataProductDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataProductsService: DataProductsService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.dataProductsService
      .getDataProducts()
      .then((response: DataProductDataSource[]) => {
        this.dataSource = new MatTableDataSource(response as DataProductDataSource[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .finally(() => (this.loading = false));
  }
}
