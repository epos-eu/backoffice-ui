import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-data-products',
  templateUrl: './browse-data-products.component.html',
  styleUrls: ['./browse-data-products.component.scss'],
})
export class BrowseDataProductsComponent {
  public sectionName = Entity.DATA_PRODUCT;
  constructor(private router: Router) {}

  public rowClicked(rowClickDetails: Array<string>): void {
    this.router.navigate(['/browse/data-products/details'].concat(rowClickDetails));
  }

  public createDataProduct(): void {
    this.router.navigate(['browse/data-products/new']);
  }
}
