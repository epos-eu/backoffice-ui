/* eslint-disable @angular-eslint/no-output-on-prefix, @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActionsService } from 'src/services/actions.service';
import { State } from 'src/utility/enums/state.enum';

const KEY = 'titleSearchText';

interface FilterItem {
  option: string;
  label: string;
}

export interface FilterEmit {
  status: any;
  title: string;
}

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent {
  constructor(private actionsService: ActionsService) {}

  @Output() onFilter: EventEmitter<FilterEmit> = new EventEmitter();
  @Output() onSubmit: EventEmitter<null> = new EventEmitter();
  @Output() onClear: EventEmitter<null> = new EventEmitter();

  public statusOptions: FilterItem[] = [
    {
      option: '',
      label: 'Any',
    },
    {
      option: State.DRAFT,
      label: 'Draft',
    },
    {
      option: State.SUBMITTED,
      label: 'Submitted',
    },
    {
      option: State.PUBLISHED,
      label: 'Published',
    },
    {
      option: State.DISCARDED,
      label: 'Discarded',
    },
    {
      option: State.ARCHIVED,
      label: 'Archived',
    },
  ];
  public filters = {
    status: '',
    title: '',
  };

  public handleFilterByStatus(event: MatSelectChange): void {
    this.filters.status = event.value;
  }

  public handleTitleSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filters.title = target.value;
    sessionStorage.setItem(KEY, target.value);
  }

  public handleClearFilters(): void {
    this.filters.status = '';
    this.filters.title = '';
    this.onClear.emit();
  }

  public handleViewResults(): void {
    this.onFilter.emit(this.filters);
  }
}
