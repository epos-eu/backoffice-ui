import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  userName: string = "";
  navigationType: string = '';

  constructor(private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.navigationType = this.actRoute.parent?.snapshot.url[0].path || '';
  }

}
