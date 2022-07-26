import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AaaiService } from 'src/aaai/aaai.service';
import { AAAIUser } from 'src/aaai/aaaiUser.interface';
import { ApiLoginService } from 'src/apiAndObjects/api/api-login.service';
import { TestLoginDetailDataSource } from 'src/apiAndObjects/objects/testLoginDetailDataSource';
import { BehaviorSubject } from 'rxjs';
import { ActionsService } from 'src/services/actions.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserInfo } from 'src/utility/objects/userInfo';
import { ActiveUserService } from 'src/services/activeUser.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewChecked {
  userName = '';
  navigationType = '';

  @ViewChild('snav') sidenav!: MatSidenav;

  public dropdown = '';
  public user: null | AAAIUser = null;
  public userInfo: UserInfo | null = null;

  public sidenavOpen = true;
  public liveChanges = new BehaviorSubject<boolean>(false);
  private readonly subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private aaai: AaaiService,
    private apiLoginService: ApiLoginService,
    private persistorService: PersistorService,
    public actionsService: ActionsService,
    private cdr: ChangeDetectorRef,
    private activeUserService: ActiveUserService,
  ) {}

  ngOnInit(): void {
    this.navigationType = this.actRoute.parent?.snapshot.url[0].path || '';

    this.subscriptions.push(
      this.aaai.watchUser().subscribe((user: AAAIUser | null) => {
        this.user = user;
        if (
          null != this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN) &&
          this.userInfo == null
        ) {
          this.callTestLogin();
        }
      }),
      this.activeUserService.activeUserInfoObservable.subscribe((userInfo: UserInfo | null) => {
        this.userInfo = userInfo as UserInfo;
      }),
    );
  }

  public handleToggle(): void {
    this.sidenav.toggle();
    this.sidenavOpen = !this.sidenavOpen;
  }

  public handleClick(): void {
    this.router.navigate(['/home']);
  }

  public toggleDropdown(dropdownName: string): void {
    if (this.dropdown === dropdownName) {
      this.dropdown = '';
    } else {
      this.dropdown = dropdownName;
    }
  }

  public login(): void {
    this.aaai.login();
  }

  public callTestLogin() {
    this.apiLoginService.endpoints.loginTest.getLoginDetailsTest
      .call()
      .then((data: Array<TestLoginDetailDataSource>) => {
        this.activeUserService.setActiveUserInfo(data[0].userInfo as UserInfo);
      });
  }

  ngAfterViewChecked(): void {
    this.actionsService.liveChangesObservable.subscribe((value) => {
      this.liveChanges.next(value);
      this.cdr.detectChanges();
    });
  }
}
