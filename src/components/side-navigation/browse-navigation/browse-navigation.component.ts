import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from 'src/services/activeUser.service';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { UserBackofficeInfo } from 'src/utility/objects/userBackofficeInfo';
@Component({
  selector: 'app-browse-navigation',
  templateUrl: './browse-navigation.component.html',
  styleUrls: ['./browse-navigation.component.scss'],
})
export class BrowseNavigationComponent implements OnInit {
  public userInfo: UserBackofficeInfo | null = null;
  constructor(private activeUserService: ActiveUserService) {}

  ngOnInit(): void {
    this.activeUserService.activeUserInfoObservable.subscribe((userInfo: UserBackofficeInfo | null) => {
      this.userInfo = userInfo as UserBackofficeInfo;
    });
  }

  public isAdmin(userRole: string): boolean {
    return userRole === UserRole.ADMIN;
  }

  public isReviewer(userRole: string): boolean {
    return userRole === UserRole.REVIEWER;
  }

  public isEditor(userRole: string): boolean {
    return userRole === UserRole.EDITOR;
  }
}
