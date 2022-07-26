import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AaaiService } from 'src/aaai/aaai.service';
import { AAAIUser } from 'src/aaai/aaaiUser.interface';
import { ActiveUserService } from 'src/services/activeUser.service';

/**
 * Displays the User Interface for triggering authentication related
 * activities and uses the {@link AaaiService} to fulfill the request.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() closeDropdown: EventEmitter<void> = new EventEmitter<void>();
  @Input() public user!: null | AAAIUser;
  public manageUrl: string;

  constructor(private readonly aaai: AaaiService, private readonly activeUserService: ActiveUserService) {
    this.manageUrl = this.aaai.getManageUrl();
  }

  public logInOut(): void {
    if (this.user != null) {
      this.activeUserService.setActiveUserInfo(null);
      this.aaai.logout();
      this.closeDropdown.emit();
    } else {
      this.aaai.login();
    }
  }
}
