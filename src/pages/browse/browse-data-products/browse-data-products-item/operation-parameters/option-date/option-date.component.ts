import { Component, Input, OnInit } from '@angular/core';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';

@Component({
  selector: 'app-option-date',
  templateUrl: './option-date.component.html',
  styleUrls: ['./option-date.component.scss'],
})
export class OptionDateComponent implements OnInit {
  @Input() param!: Mapping;

  public ngOnInit(): void {
    console.debug(this.param);
  }
}
