/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

interface FilterItem {
  option: string;
  label: string;
}

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent {
  @Output() onFilter: EventEmitter<string> = new EventEmitter();

  public statusOptions: FilterItem[] = [
    {
      option: 'DRAFT',
      label: 'Draft',
    },
    {
      option: 'SUBMITTED',
      label: 'Submitted',
    },
    {
      option: 'PUBLISHED',
      label: 'Published',
    },
    {
      option: 'DECLINED',
      label: 'Declined',
    },
  ];

  public handleFilterByStatus(event: MatSelectChange): void {
    this.onFilter.emit(event.value);
  }
}
