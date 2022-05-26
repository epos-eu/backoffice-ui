import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { DataProductsService } from 'src/services/data-products.service';

@Component({
  selector: 'app-browse-data-products',
  templateUrl: './browse-data-products.component.html',
  styleUrls: ['./browse-data-products.component.scss'],
})
export class BrowseDataProductsComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'name'];
  public dataSource!: MatTableDataSource<DataProduct>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataProductsService: DataProductsService, private router: Router) {}

  ngOnInit(): void {
    this.dataProductsService
      .getWebservices()
      .then((response) => {
        this.dataSource = new MatTableDataSource(response as DataProduct[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => console.error(err));
  }
}
