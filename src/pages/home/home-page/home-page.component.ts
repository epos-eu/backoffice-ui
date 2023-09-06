import { Subscription } from 'rxjs';
import { IActionItem } from 'src/components/actions-data/actions-data.interface';
import { ActiveUserService } from 'src/services/activeUser.service';
import { UserBackofficeInfo } from 'src/utility/objects/userBackofficeInfo';
import { Component, OnInit } from '@angular/core';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { State } from 'src/utility/enums/state.enum';
import { Router } from '@angular/router';

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
      label: 'Draft',
      count: 0,
      color: 'default',
      type: State.DRAFT,
    },
    {
      label: 'Submitted',
      count: 0,
      color: 'warning',
      type: State.SUBMITTED,
    },
    {
      label: 'Published',
      count: 0,
      color: 'success',
      type: State.PUBLISHED,
    },
    {
      label: 'Archived',
      count: 0,
      color: 'error',
      type: State.ARCHIVED,
    },
    {
      label: 'Discarded',
      count: 0,
      color: 'error',
      type: State.DISCARDED,
    },
  ];

  constructor(
    private readonly activeUserService: ActiveUserService,
    private actionsService: ActionsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activeUserService.activeUserInfoObservable.subscribe((userInfo: UserBackofficeInfo | null) => {
        this.userInfo = userInfo as UserBackofficeInfo;
      }),
    );
    this.actionsService.initEditedItems();
    this.actionsService.editedItemsObservable.subscribe((editedItems: Array<IChangeItem>) => {
      this.getCounts(editedItems);
    });
  }

  private getCounts(editedItems: Array<IChangeItem>): void {
    const types = Object.values(State);
    editedItems.map((item) => {
      if (types.includes(item.state)) {
        const index = this.actionItems.findIndex((obj) => obj.type === item.state);
        this.actionItems[index].count += 1;
      }
    });
  }
}
