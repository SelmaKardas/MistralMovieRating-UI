import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth-service.component';


@Injectable()
export class AdminRouteGuard implements CanActivate {
    constructor(private _authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
        return from(this._authService.isLoggedIn());
    }
            
}