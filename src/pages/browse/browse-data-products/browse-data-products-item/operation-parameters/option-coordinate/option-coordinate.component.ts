import { Component } from '@angular/core';
import { CoordinateType } from 'src/utility/enums/coordinateType.enum';

@Component({
  selector: 'app-option-coordinate',
  templateUrl: './option-coordinate.component.html',
  styleUrls: ['./option-coordinate.component.scss'],
})
export class OptionCoordinateComponent {
  public coordinateTypes = Object.values(CoordinateType);
}
