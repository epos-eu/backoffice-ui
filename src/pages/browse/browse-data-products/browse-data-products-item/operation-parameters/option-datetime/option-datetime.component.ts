import { Component } from '@angular/core';
import { SemanticTag } from 'src/utility/enums/semanticTag.enum';

@Component({
  selector: 'app-option-datetime',
  templateUrl: './option-datetime.component.html',
  styleUrls: ['./option-datetime.component.scss'],
})
export class OptionDatetimeComponent {
  public semanticTags = Object.values(SemanticTag);
}
