import { Input, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { Status } from 'src/utility/enums/status.enum';
import { SpatialExtentLocationIndexObj } from '../spatial-coverage-form-details/spatial-coverage-map/simpleSpatialControl/simpleSpatialControl.component';
import { LinkedEntity, Location } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { GetLocationParams } from 'src/apiAndObjects/api/location/getLocation';
import { Entity } from 'src/utility/enums/entity.enum';
import { SpatialTemporalEntityExecutionService } from 'src/services/calls/spatial-temporal-entity-execution.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-spatial-coverage',
  templateUrl: './spatial-coverage.component.html',
  styleUrl: './spatial-coverage.component.scss',
})
export class SpatialCoverageComponent implements OnInit {
  constructor(
    private entityExecutionService: EntityExecutionService,
    private spatialTemporalEntityExecutionService: SpatialTemporalEntityExecutionService,
    private apiService: ApiService,
  ) {}

  @Input() dataProduct!: DataProduct | null;

  @Input() spatialExtent: LinkedEntity[] | undefined = [];

  private updateMapTimeout?: NodeJS.Timeout;

  public stateEnum = Status;

  public spatialCoverageInput: Array<string | undefined> = [];

  public spatialCoverageChange: Subject<Array<string | undefined>> = new Subject();

  public spatialExtents: Array<Location> = [];

  public ngOnInit(): void {
    this.initSpatialCoverages();
  }

  /**
   * The `initSpatialCoverages` function initializes spatial coverages by fetching location data from an
   * API and updating the spatialExtents array and spatialCoverageInput.
   */
  private initSpatialCoverages() {
    this.spatialExtent?.forEach((location: LinkedEntity) => {
      const params: GetLocationParams = {
        instanceId: location.instanceId as string,
        metaId: location.metaId as string,
      };
      this.apiService.endpoints.Location.get.call(params).then((items: Array<Location>) => {
        items.forEach((location, index) => {
          this.spatialExtents.push(location);
          this.spatialCoverageInput[index] = location.location;
        });
        setTimeout(() => {
          this.refreshPointsOnMap();
        }, 100);
      });
    });
  }

  public newSpatialCoverage() {
    const newSpatialCoverage: Location = {
      location: 'POINT(0 0)',
    };
    this.apiService.endpoints.Location.create.call(newSpatialCoverage).then((newLocation) => {
      /* The code snippet `this.spatialExtents.push(newLocation);
this.spatialCoverageInput.push(newLocation.location);` is adding a new location object to the
`spatialExtents` array and the corresponding location string to the `spatialCoverageInput` array. */
      this.spatialExtents.push(newLocation);
      this.spatialCoverageInput.push(newLocation.location);

      // Update Global Dataproduct after change to Spatial Extents Arr
      const newLocationEntity: LinkedEntity = {
        instanceId: newLocation.instanceId,
        metaId: newLocation.metaId,
        entityType: Entity.LOCATION,
        uid: newLocation.uid,
      };
      if (this.dataProduct) {
        this.dataProduct?.spatialExtent?.push(newLocationEntity);
        this.entityExecutionService.setActiveDataProduct(
          this.entityExecutionService.convertToDataProduct(this.dataProduct),
        );
      }
      setTimeout(() => {
        this.refreshPointsOnMap();
      }, 100);
    });
  }

  public deleteSpatialCoverage(index: number) {
    // Delete Entity From DB
    this.spatialTemporalEntityExecutionService
      .handleSpatialTemporalDelete(EntityEndpointValue.LOCATION, this.spatialExtents[index].instanceId!)
      .then((success) => {
        if (success) {
          // Remove Inputs from form and coverage from map
          this.spatialCoverageInput.splice(index, 1);
          this.spatialExtents.splice(index, 1);
          this.dataProduct?.spatialExtent?.splice(index, 1);

          // Update Global Dataproduct after change to Spatial Extents Arr
          if (this.dataProduct) {
            this.entityExecutionService.setActiveDataProduct(
              this.entityExecutionService.convertToDataProduct(this.dataProduct),
            );
          }
        }
        setTimeout(() => {
          this.refreshPointsOnMap();
        }, 100);
      });
  }

  public saveSpatialCoverage(index: number) {
    this.spatialTemporalEntityExecutionService.handleSpatialSave(this.spatialExtents[index]);
  }

  /**
   * The function refreshes points on a map by formatting the spatial extent from a string to an object
   * and emitting the location values.
   */
  public refreshPointsOnMap() {
    this.spatialCoverageChange.next(this.spatialCoverageInput);
  }

  /**
   * The function `updateSpatialCoverage` updates the spatial coverage of a location based on the event
   * index and triggers a map refresh after a timeout.
   * @param {SpatialExtentLocationIndexObj} event - The `event` parameter in the `updateSpatialCoverage`
   * function is an object of type `SpatialExtentLocationIndexObj`. It contains two properties:
   */
  public updateSpatialCoverage(event: SpatialExtentLocationIndexObj) {
    this.spatialExtents.forEach((spatialExtent: Location, index) => {
      if (event.index === index) {
        spatialExtent.location = event.location;
        this.spatialCoverageInput[index] = event.location;
      }
    });

    clearTimeout(this.updateMapTimeout);
    this.updateMapTimeout = setTimeout(() => {
      this.refreshPointsOnMap();
    }, 100);
  }
}
