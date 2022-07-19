import { Component } from '@angular/core';
import { IActionItem } from 'src/components/actions-data/actions-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public actionItems: Array<IActionItem> = [
    {
      label: 'Drafted',
      count: 12,
      color: 'default',
    },
    {
      label: 'Waiting for approval',
      count: 6,
      color: 'warning',
    },
    {
      label: 'Approved',
      count: 2,
      color: 'success',
    },
    {
      label: 'Declined',
      count: 3,
      color: 'error',
    },
  ];
}
