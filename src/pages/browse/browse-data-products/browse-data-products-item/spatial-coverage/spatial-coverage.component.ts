import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { Status } from 'src/utility/enums/status.enum';
import { SpatialExtentLocationIndexObj } from '../spatial-coverage-form-details/spatial-coverage-map/simpleSpatialControl/simpleSpatialControl.component';
import { Location } from 'generated/backofficeSchemas';

@Component({
  selector: 'app-spatial-coverage',
  templateUrl: './spatial-coverage.component.html',
  styleUrl: './spatial-coverage.component.scss',
})
export class SpatialCoverageComponent {
  constructor(private entityExecutionService: EntityExecutionService) {}

  @Input() dataProduct!: DataProduct;

  private updateMapTimeout?: NodeJS.Timeout;
  public stateEnum = Status;
  public spatialCoverageInput: Array<string | undefined> = [];
  public spatialCoverageChange: Subject<Array<string | undefined>> = new Subject();

  public newSpatialCoverage() {
    this.dataProduct.spatialExtent?.push({ location: 'POINT(0 0)' });
    this.spatialCoverageInput.push('0 0');

    // Update Global Dataproduct after change to Spatial Extents Arr
    this.entityExecutionService.setActiveDataProduct(
      this.entityExecutionService.convertToDataProduct(this.dataProduct),
    );

    setTimeout(() => {
      this.refreshPointsOnMap();
    }, 100);
  }

  public deleteSpatialCoverage(index: number) {
    this.spatialCoverageInput.splice(index, 1);
    this.dataProduct.spatialExtent?.splice(index, 1);

    // Update Global Dataproduct after change to Spatial Extents Arr
    this.entityExecutionService.setActiveDataProduct(
      this.entityExecutionService.convertToDataProduct(this.dataProduct),
    );

    setTimeout(() => {
      this.refreshPointsOnMap();
    }, 100);
  }

  /**
   * The function refreshes points on a map by formatting the spatial extent from a string to an object
   * and emitting the location values.
   */
  public refreshPointsOnMap() {
    this.spatialCoverageChange.next(this.spatialCoverageInput);
  }

  /**
   * This funtion is called by an ouput from @SimpleSpatialControlComponent whenever one of the Spatial Coverage Inputs is changed.
   * It replaces the old value value at index @n and replaces the value with the updated one.
   */
  public updateSpatialCoverage(event: SpatialExtentLocationIndexObj) {
    // Update global DataProduct Obj
    const dataProduct = this.entityExecutionService.getActiveDataProductValue();
    if (null != dataProduct?.spatialExtent) {
      dataProduct.spatialExtent.forEach((spatialExtent: Location, index) => {
        if (event.index === index) {
          spatialExtent.location = event.location;
        }
      });
      // Update points on map
      this.entityExecutionService.setActiveDataProduct(dataProduct);
      const spatExtentsToUpdate: Array<string> = [];
      dataProduct.spatialExtent.forEach((spatialExtent: Location) => {
        spatExtentsToUpdate.push(spatialExtent.location as string);
      });
      this.spatialCoverageInput = spatExtentsToUpdate;

      clearTimeout(this.updateMapTimeout);
      this.updateMapTimeout = setTimeout(() => {
        this.refreshPointsOnMap();
      }, 100);
    }
  }
}
