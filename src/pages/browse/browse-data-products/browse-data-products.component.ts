import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SectionName } from 'src/utility/enums/sectionName.enum';

@Component({
  selector: 'app-browse-data-products',
  templateUrl: './browse-data-products.component.html',
  styleUrls: ['./browse-data-products.component.scss'],
})
export class BrowseDataProductsComponent {
  public sectionName = SectionName.DATA_PRODUCT;
  constructor(private router: Router) {}

  public rowClicked(rowClickDetails: Array<string>): void {
    this.router.navigate(rowClickDetails);
  }
}
