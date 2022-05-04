import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  userName = '';
  navigationType = '';

  constructor(private router: Router, private actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.navigationType = this.actRoute.parent?.snapshot.url[0].path || '';
  }
}
