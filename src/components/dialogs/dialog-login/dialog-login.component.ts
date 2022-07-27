import { Component } from '@angular/core';
import { AaaiService } from 'src/aaai/aaai.service';
import { AAAIUser } from 'src/aaai/aaaiUser.interface';
import { ActiveUserService } from 'src/services/activeUser.service';

/**
 * Displays the User Interface for triggering authentication related
 * activities and uses the {@link AaaiService} to fulfill the request.
 */
@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss'],
})
export class DialogLoginComponent {
  public user: null | AAAIUser = null;
  public manageUrl: string;

  constructor(private readonly aaai: AaaiService, private readonly activeUserService: ActiveUserService) {
    this.manageUrl = this.aaai.getManageUrl();
    this.aaai.watchUser().subscribe((aaaiUser: AAAIUser | null) => {
      this.user = aaaiUser;
    });
  }

  public logInOut(): void {
    if (this.user != null) {
      this.activeUserService.setActiveUserInfo(null);
      this.aaai.logout();
    } else {
      this.aaai.login();
    }
  }
}
