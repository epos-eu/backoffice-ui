import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AaaiService } from 'src/aaai/aaai.service';
import { AAAIUser } from 'src/aaai/aaaiUser.interface';
import { BehaviorSubject } from 'rxjs';
import { ActionsService } from 'src/services/actions.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserBackofficeInfo } from 'src/utility/objects/userBackofficeInfo';
import { ActiveUserService } from 'src/services/activeUser.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { SectionsService } from 'src/services/sections.service';
import { Sections } from 'src/utility/objects/login/sections';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { IndexDetailDataSource } from 'src/apiAndObjects/objects/indexDetailDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/distributionDetailDataSource';
import {
  GetDistributionDetail,
  GetDistributionDetailsParams,
} from 'src/apiAndObjects/api/distribution/getDistributionDetail';
import { GetWebserviceDetailParams } from 'src/apiAndObjects/api/webservice/getWebserviceDetail';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewChecked, OnDestroy {
  userName = '';
  navigationType = '';

  @ViewChild('snav') sidenav!: MatSidenav;
  @ViewChild('dialog') dialog!: ElementRef<HTMLElement>;

  public dropdown = '';
  public user: null | AAAIUser = null;
  public userInfo: UserBackofficeInfo | null = null;

  public sidenavOpen = true;
  public liveChanges = new BehaviorSubject<boolean>(false);
  private readonly subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private aaai: AaaiService,
    private persistorService: PersistorService,
    public actionsService: ActionsService,
    private cdr: ChangeDetectorRef,
    private activeUserService: ActiveUserService,
    private sectionsService: SectionsService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.initClick();
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
      this.activeUserService.activeUserInfoObservable.subscribe((userInfo: UserBackofficeInfo | null) => {
        this.userInfo = userInfo as UserBackofficeInfo;
      }),
    );
  }

  private initClick(): void {
    this.onDocumentClick = this.onDocumentClick.bind(this);
    document.addEventListener('click', this.onDocumentClick);
  }

  private onDocumentClick(event: MouseEvent) {
    if (this.dialog.nativeElement.contains(event.target as Node)) {
      return;
    }
    this.dropdown = '';
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
    this.apiService.endpoints.index.getIndexDetails.call().then((data: Array<IndexDetailDataSource>) => {
      this.sectionsService.setSections(data[0].sections as Array<Sections>);
      this.activeUserService.setActiveUserInfo(data[0].userInfo as UserBackofficeInfo);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onDocumentClick);
  }

  ngAfterViewChecked(): void {
    this.actionsService.liveChangesObservable.subscribe((value) => {
      this.liveChanges.next(value);
      this.cdr.detectChanges();
    });
  }

  testApiCall(): void {
    const params: GetDistributionDetailsParams = {
      singleOptionOnly: true,
      instanceId: '88967808-3495-4128-8666-213a54a671d2',
    };
    this.apiService.endpoints.distribution.getDistributionDetail
      .call(params)
      .then((data: Array<DistributionDetailDataSource>) => {
        console.debug(data);
      });
  }
}
