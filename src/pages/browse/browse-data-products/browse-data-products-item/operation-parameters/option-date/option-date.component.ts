import { Component } from '@angular/core';
import { SemanticTag } from 'src/utility/enums/semanticTag.enum';

@Component({
  selector: 'app-option-date',
  templateUrl: './option-date.component.html',
  styleUrls: ['./option-date.component.scss'],
})
export class OptionDateComponent {
  public semanticTags = Object.values(SemanticTag);
}
