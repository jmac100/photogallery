import { Injectable } from '@angular/core';
import { Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { CanActivate }            from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor
  (
    private auth: AuthService,
    private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.authenticated()){
      return true;
      } else {
        this._router.navigate(['']);
        return false;
      }
  }
}
