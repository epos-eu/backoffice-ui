import { Observable, Subscription } from 'rxjs';
import { IActionItem } from 'src/components/actions-data/actions-data.interface';
import { ActiveUserService } from 'src/services/activeUser.service';
import { UserBackofficeInfo } from 'src/utility/objects/userBackofficeInfo';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { State } from 'src/utility/enums/state.enum';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Array<Subscription> = new Array<Subscription>();

  public userInfo$!: Observable<UserBackofficeInfo | null>;

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

  public loading$ = this.loadingService.loadingObs;

  constructor(
    private readonly activeUserService: ActiveUserService,
    private actionsService: ActionsService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.subscriptions.push(
      this.activeUserService.activeUserInfoObservable.subscribe(() => {
        this.loadingService.setLoading(false);
      }),
    );
    this.userInfo$ = this.activeUserService.activeUserInfoObservable;
    this.actionsService.initEditedItems();
    this.actionsService.editedItemsObservable.subscribe((editedItems: Array<IChangeItem>) => {
      this.getCounts(editedItems);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
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
