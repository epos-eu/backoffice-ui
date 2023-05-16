/* eslint-disable @angular-eslint/no-output-on-prefix, @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActionsService } from 'src/services/actions.service';

const KEY = 'uidSearchText';

interface FilterItem {
  option: string;
  label: string;
}

export interface FilterEmit {
  status: any;
  uid: string;
}

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent implements OnInit {
  constructor(private actionsService: ActionsService) {}

  @Output() onFilter: EventEmitter<FilterEmit> = new EventEmitter();
  @Output() onClear: EventEmitter<null> = new EventEmitter();

  public statusOptions: FilterItem[] = [
    {
      option: '',
      label: 'Any',
    },
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
  public filters = {
    status: '',
    uid: '',
  };

  private _initWatchers(): void {
    this.actionsService.shouldClearFiltersObs.subscribe((clear: boolean) => {
      if (clear) {
        this.handleClearFilters();
      } else {
        const cached = sessionStorage.getItem(KEY);
        if (cached != null) {
          this.filters.uid = cached;
          this.onFilter.emit(this.filters);
        }
      }
    });
  }

  public ngOnInit(): void {
    this._initWatchers();
  }

  public handleFilterByStatus(event: MatSelectChange): void {
    this.filters.status = event.value;
    this.onFilter.emit(this.filters);
  }

  public handleUidSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filters.uid = target.value;
    sessionStorage.setItem(KEY, target.value);
    this.onFilter.emit(this.filters);
  }

  public handleClearFilters(): void {
    this.filters.status = '';
    this.filters.uid = '';
    this.onClear.emit();
  }
}
