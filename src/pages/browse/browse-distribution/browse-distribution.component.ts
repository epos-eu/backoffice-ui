import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { EntityService } from 'src/services/entity.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-browse-distribution',
  templateUrl: './browse-distribution.component.html',
  styleUrls: ['./browse-distribution.component.scss'],
})
export class BrowseDistributionComponent {
  public sectionName = Entity.DISTRIBUTION;

  constructor(private router: Router, private entityService: EntityService) {}

  public rowClicked(row: Record<string, unknown>): void {
    const dataProduct = row['dataProduct'] as EntityDetail;
    if (dataProduct) {
      this.entityService.setFocusedDistribution(row['instanceId'] as string);
      this.router.navigate([
        `/browse/${EntityEndpointValue.DATA_PRODUCT}/details`,
        dataProduct['metaId'],
        dataProduct['instanceId'],
      ]);
    }
  }

  public createDistribution(): void {
    this.router.navigate([`browse/${EntityEndpointValue.DISTRIBUTION}/new`]);
  }
}
