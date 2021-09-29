import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth-service.component';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-signin-callback',
  template: `<div></div>`
})

export class SigninRedirectCallbackComponent implements OnInit {
  constructor(private _authService: AuthService,
              private _router: Router,
              private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this._authService.completeLogin().then(user => {
      var userId = this._authService.getAccessTokenClaim(user.access_token, 'sub')
      this._authService.loadPermissions(userId).then(data => {
        this.permissionsService.loadPermissions(data);
        this._router.navigate(['/'], { replaceUrl: true });
      });
      
    })
  }
}