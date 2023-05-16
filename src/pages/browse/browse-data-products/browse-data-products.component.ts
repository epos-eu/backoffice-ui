import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-browse-data-products',
  templateUrl: './browse-data-products.component.html',
  styleUrls: ['./browse-data-products.component.scss'],
})
export class BrowseDataProductsComponent {
  public sectionName = Entity.DATA_PRODUCT;
  constructor(private router: Router) {}

  public rowClicked(rowClickDetails: Array<string>): void {
    this.router.navigate([`/browse/${EntityEndpointValue.DATA_PRODUCT}/details`].concat(rowClickDetails));
  }

  public createDataProduct(): void {
    this.router.navigate([`browse/${EntityEndpointValue.DATA_PRODUCT}/new`]);
  }
}
