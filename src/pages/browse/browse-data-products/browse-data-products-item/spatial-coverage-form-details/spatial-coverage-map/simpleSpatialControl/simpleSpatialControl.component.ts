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
import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SpatialExtent } from 'src/apiAndObjects/objects/types/spatialExtent.type';

import { SpatialCoverageType } from 'src/utility/enums/spatialCoverageType.enum';

@Component({
  selector: 'app-simple-spatial-control',
  templateUrl: './simpleSpatialControl.component.html',
  styleUrls: ['./simpleSpatialControl.component.scss'],
})
export class SimpleSpatialControlComponent {
  @Input() inputsDisabled = false;
  @Input() showClearButton = false;

  @Input()
  set activeCoverage(type: SpatialCoverageType) {
    if (type) {
      this.activeCoverageType = type;
    }
  }

  @Input()
  set spatialExtent(value: SpatialExtent) {
    if (null != value) {
      this.setSpatialCoverageVariables(value);
    }
  }

  public floatLabelControl = new UntypedFormControl('auto');
  public clearButtonEnabled = false;
  public polygonCoverage = '';
  public activeCoverageType?: SpatialCoverageType;

  public latitude = 0;
  public longitude = 0;

  public spatCovEnum = SpatialCoverageType;

  /**
   * The function sets spatial coverage variables based on the data product's spatial extent.
   */
  private setSpatialCoverageVariables(extent: SpatialExtent) {
    if (extent.location.includes(SpatialCoverageType.POINT)) {
      const coordStringArr = this.formatLocationFromObjectToString(extent.location as string).split(' ');
      const coordNumArr = coordStringArr.map((coordString: string) => Number(coordString));
      this.latitude = coordNumArr[0];
      this.longitude = coordNumArr[1];
    } else {
      this.polygonCoverage = this.formatLocationFromObjectToString(extent.location);
    }
  }

  /**
   * The function `formatLocationFromObjectToString` extracts a string representation of a location from
   * an object.
   * @param {string} location - The `location` parameter is a string that represents a location.
   * @returns a string.
   */
  private formatLocationFromObjectToString(location: string): string {
    let regex = /\(\((.*?)\)\)/g;
    if (location.includes(SpatialCoverageType.POINT)) {
      regex = /\((.*?)\)/g;
    }

    const match = regex.exec(location);
    return match !== null ? match[1] : '';
  }
}
