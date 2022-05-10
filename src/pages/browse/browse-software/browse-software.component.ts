import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Software } from 'src/api/models/entities/software.model';
import { SoftwareService } from 'src/services/software.service';

@Component({
  selector: 'app-browse-software',
  templateUrl: './browse-software.component.html',
  styleUrls: ['./browse-software.component.scss'],
})
export class BrowseSoftwareComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'name'];
  public dataSource!: MatTableDataSource<Software>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private softwareService: SoftwareService, private router: Router) {}

  ngOnInit(): void {
    this.softwareService
      .getSoftware()
      .then((response) => {
        this.dataSource = new MatTableDataSource(response as Software[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => console.error(err));
  }
}
