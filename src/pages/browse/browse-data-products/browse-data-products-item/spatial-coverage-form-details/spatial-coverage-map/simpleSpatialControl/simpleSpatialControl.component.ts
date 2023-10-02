/*
         Copyright 2021 EPOS ERIC

 Licensed under the Apache License, Version 2.0 (the License); you may not
 use this file except in compliance with the License.  You may obtain a copy
 of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an AS IS BASIS, WITHOUT
 WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 License for the specific language governing permissions and limitations under
 the License.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BoundingBox, PointCoord } from 'src/utility/config/boundingBox.interface';
import { SimpleBoundingBox } from 'src/utility/config/simpleBoundingBox';
import { SimplePointCoord } from 'src/utility/config/simplePointCoord';
import { SpatialCoverageType } from 'src/utility/enums/spatialCoverageType.enum';

@Component({
  selector: 'app-simple-spatial-control',
  templateUrl: './simpleSpatialControl.component.html',
  styleUrls: ['./simpleSpatialControl.component.scss'],
})
export class SimpleSpatialControlComponent {
  @Input() inputsDisabled = false;
  @Input() showClearButton = false;
  @Output() changeBBox = new EventEmitter<BoundingBox>();
  @Output() applyEdited = new EventEmitter<BoundingBox>();
  @Output() clearBBox = new EventEmitter<void>();
  @Input() type: SpatialCoverageType = SpatialCoverageType.POINT;
  @Input()
  set coords(value: BoundingBox | PointCoord | undefined) {
    if (null != value && value instanceof SimpleBoundingBox) {
      this.setBbox(value);
      console.debug('Polygon');
    }
    if (null != value && value instanceof SimplePointCoord) {
      this.setPoint(value);
      console.debug('Point');
    }
  }

  public clearButtonEnabled = false;

  public maxLatNorth = '';
  public maxLonEast = '';
  public minLatSouth = '';
  public minLonWest = '';

  public latitude = '';
  public longitude = '';

  public spatCovEnum = SpatialCoverageType;

  public onChange(): void {
    this.changeBBox.emit(
      SimpleBoundingBox.makeFromArray([this.maxLatNorth, this.maxLonEast, this.minLatSouth, this.minLonWest]),
    );
  }

  public clearExtent(): void {
    this.clearBBox.emit();
  }

  public applyExtent(): void {
    this.applyEdited.emit();
  }

  private setBbox(bbox: BoundingBox): void {
    this.clearButtonEnabled = bbox.isBounded();
    this.maxLatNorth = null == bbox.getMaxLat() ? '' : bbox.getMaxLat().toString();
    this.maxLonEast = null == bbox.getMaxLon() ? '' : bbox.getMaxLon().toString();
    this.minLatSouth = null == bbox.getMinLat() ? '' : bbox.getMinLat().toString();
    this.minLonWest = null == bbox.getMinLon() ? '' : bbox.getMinLon().toString();
  }

  private setPoint(point: PointCoord): void {
    this.clearButtonEnabled = point.isBounded();
    this.latitude = null == point.getLat() ? '' : point.getLat().toString();
    this.longitude = null == point.getLon() ? '' : point.getLon().toString();
  }
}
