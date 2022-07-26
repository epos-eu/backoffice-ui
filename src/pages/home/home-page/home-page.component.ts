import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IActionItem } from 'src/components/actions-data/actions-data.interface';
import { ActiveUserService } from 'src/services/activeUser.service';
import { UserInfo } from 'src/utility/objects/userInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public userInfo: UserInfo | null = null;
  private readonly subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(private readonly activeUserService: ActiveUserService) {
    this.subscriptions.push(
      this.activeUserService.activeUserInfoObservable.subscribe((userInfo: UserInfo | null) => {
        this.userInfo = userInfo as UserInfo;
      }),
    );
  }

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
