import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { AuthenticationProvider } from './authProvider.interface';
import { AAAIUser } from './aaaiUser.interface';
import { OAuthAuthenticationProvider } from './impl/oAuthProvider';
import { OAuthService } from 'angular-oauth2-oidc';

/**
 * This uses a plugin ({@link https://www.npmjs.com/package/angular-oauth2-oidc})
 * to handle most of the interactions with the AAAI service.
 * It provides a global interface that exposes login,
 * logout and user information access to the rest of the GUI.
 */
export class AaaiService {
  private readonly now = new Date();
  private readonly logOutAfterInactivityPeriod = this.now.setHours(this.now.getHours() + 1);

  private constructor(private readonly authProvider: AuthenticationProvider) {
    this.startLogoutInterval();
  }

  /** Static factory method that creates and configures aaai service */
  public static make(authProvider: AuthenticationProvider): AaaiService {
    return new AaaiService(authProvider);
  }

  /**
   * Returns an Observable of {@link AAAIUser}.
   */
  public watchUser(): Observable<null | AAAIUser> {
    return this.authProvider.watchForUserChange();
  }
  /**
   * Get the current user.
   */
  public getUser(): null | AAAIUser {
    return this.authProvider.getUser();
  }

  public login(): void {
    this.authProvider.login();
  }

  public logout(): void {
    this.authProvider.logout();
  }

  public getManageUrl(): string {
    return this.authProvider.getManageUrl();
  }

  private startLogoutInterval(): void {
    setInterval(() => {
      const logoutTime = new Date(this.logOutAfterInactivityPeriod);
      if (null != this.getUser() && logoutTime < new Date()) {
        console.log('Time to log out');
        this.logout();
      }
    }, 60 * 1000); // 1 mins
  }
}

/**
 * Factory function.
 * @param router
 * @param oAuthService
 */
export const aaaiServiceFactory = (injector: Injector, oAuthService: OAuthService): AaaiService => {
  const authProvider: AuthenticationProvider = new OAuthAuthenticationProvider(injector, oAuthService);
  return AaaiService.make(authProvider);
};

/**
 * Provider for injection.
 */
export const aaaiServiceProvider = {
  provide: AaaiService,
  useFactory: aaaiServiceFactory,
  deps: [Injector, OAuthService],
};
