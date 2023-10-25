import { Component, EventEmitter, Input, Output } from '@angular/core';

interface HeaderClass {
  active: boolean;
}

@Component({
  selector: 'app-lazy-load-panel',
  templateUrl: './lazy-load-panel.component.html',
  styleUrls: ['./lazy-load-panel.component.scss'],
})
export class LazyLoadPanelComponent {
  @Input() expanded = false;
  @Input() title = '';
  @Input() headerClass!: HeaderClass;
  @Output() afterOpened = new EventEmitter();
  @Output() afterClosed = new EventEmitter();

  public handleOpened(): void {
    this.afterOpened.emit();
  }

  public handleClosed(): void {
    this.afterClosed.emit();
  }
}
