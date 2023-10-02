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
import { PointCoord } from './boundingBox.interface';

export class SimplePointCoord implements PointCoord {
  private bounded: boolean;
  private lat?: number;
  private lon?: number;

  public constructor(lat: null | number, lon: null | number) {
    this.bounded = null != lat && null != lon;

    if (this.bounded) {
      this.lat = lat?.valueOf();
      this.lon = lon?.valueOf();
    }
  }

  // public static isDifferent(bbox1: BoundingBox, bbox2: BoundingBox): boolean {
  //   const bbox1Array = bbox1 == null ? [] : bbox1.asArray();
  //   const bbox2Array = bbox2 == null ? [] : bbox2.asArray();

  //   return JSON.stringify(bbox1Array) !== JSON.stringify(bbox2Array);
  // }

  public static makeFromArray(boundsArray: Array<unknown>): PointCoord {
    return new SimplePointCoord(Number(boundsArray[0]).valueOf(), Number(boundsArray[1]).valueOf());
  }

  public static makeUnbounded(): SimplePointCoord {
    return new SimplePointCoord(null, null);
  }

  /**
   * Calculates the position of a point and returns a @SimplePointCoord
   */
  public static makePoint(position: Array<number>): SimplePointCoord {
    return new SimplePointCoord(position[0], position[1]);
  }

  // private toPrecision(value: number): number {
  //   return Math.round(value * Math.pow(10, this.PRECISION_DP)) / Math.pow(10, this.PRECISION_DP);
  // }

  getLat(): number {
    return this.lat ? this.lat : 0;
  }
  getLon(): number {
    return this.lon ? this.lon : 0;
  }
  isBounded(): boolean {
    return this.bounded;
  }
  asArray(): [number, number] {
    return [this.getLat(), this.getLon()];
  }
}
