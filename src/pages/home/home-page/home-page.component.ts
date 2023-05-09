import { Subscription } from 'rxjs';
import { IActionItem } from 'src/components/actions-data/actions-data.interface';
import { ActiveUserService } from 'src/services/activeUser.service';
import { UserBackofficeInfo } from 'src/utility/objects/userBackofficeInfo';
import { Component, OnInit } from '@angular/core';
import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public userInfo: UserBackofficeInfo | null = null;
  private readonly subscriptions: Array<Subscription> = new Array<Subscription>();

  public actionItems: Array<IActionItem> = [
    {
      label: 'Drafted',
      count: 0,
      color: 'default',
      type: Status.Draft,
    },
    {
      label: 'Waiting for approval',
      count: 0,
      color: 'warning',
      type: Status.Submitted,
    },
    {
      label: 'Approved',
      count: 0,
      color: 'success',
      type: Status.Approved,
    },
    {
      label: 'Declined',
      count: 0,
      color: 'error',
      type: Status.Declined,
    },
  ];

  constructor(private readonly activeUserService: ActiveUserService, private actionsService: ActionsService) {
    this.subscriptions.push(
      this.activeUserService.activeUserInfoObservable.subscribe((userInfo: UserBackofficeInfo | null) => {
        this.userInfo = userInfo as UserBackofficeInfo;
      }),
    );
  }

  ngOnInit(): void {
    this.actionsService.initEditedItems();
    // this.actionsService.editedItemsObservable.subscribe((editedItems: Array<IChangeItem>) => {
    //   this.getCounts(editedItems);
    // });
  }

  private getCounts(editedItems: Array<IChangeItem>): void {
    const types = Object.values(Status);
    editedItems.map((item) => {
      if (types.includes(item.status)) {
        const index = this.actionItems.findIndex((obj) => obj.type === item.status);
        this.actionItems[index].count += 1;
      }
    });
  }
}
