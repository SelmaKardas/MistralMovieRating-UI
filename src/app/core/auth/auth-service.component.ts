import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'app/constants';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserManager, User } from 'oidc-client';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  private _loginChangedSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();

  constructor(private httpClient: HttpClient, private permissionsService: NgxPermissionsService) {
    const stsSettings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}signin-oidc`,
      scope: 'openid profile api',
      response_type: 'code',
      post_logout_redirect_uri: `${Constants.clientRoot}signout-callback-oidc`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${Constants.clientRoot}assets/silent-callback.html`
    };
    this._userManager = new UserManager(stsSettings);
    this._userManager.events.addAccessTokenExpired(_ => {
      this._loginChangedSubject.next(false);
    });
    this._userManager.events.addUserLoaded(user => {
      if (this._user !== user) {
        this._user = user;
        this._loginChangedSubject.next(!!user && !user.expired);
      }
    });
  }


  login() {
    if (!this._user) 
    {
      return this._userManager.signinRedirect();
    }
  }

  isLoggedIn(): Promise<boolean> {
    return this._userManager.getUser().then(user => {
      const userCurrent = !!user && !user.expired;
      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }
      this._user = user;
      return userCurrent;
    });
  }

  getUserId(): Promise<string> {
    return this._userManager.getUser().then(user => {
      console.log(user);
      if (!!user && !user.expired) {
        return this.getAccessTokenClaim(user.access_token, 'sub');
      } 
    });
  }

  completeLogin() {
    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this._userManager.signoutRedirect();
  }

  completeLogout() {
    this._user = null;
    this._loginChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }

  getAccessToken() {
    this._userManager.startSilentRenew();
    return this._userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
    });
  }

  public loadPermissions(userId : string): Promise<string[]> {
    return this.httpClient
    .get<Array<string>>(
      Constants.apiRoot + `users/${userId}/permissions`
    )
    .toPromise();
   
}
public getAccessTokenClaim(token: string, claim: string): string {
  const claims = JSON.parse(atob(token.split('.')[1]));
  return claims[claim];
}
}