import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock('MRS4HzH7uSm9xluhXoiTVDtUbJOC80Z9', 'jmac100.auth0.com', {
    languageDictionary: {
      title: "photos.jwmac.info"
    },
    theme: {
      primaryColor: '#022f5a'
    }
  });

  constructor(private _router: Router) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    this._router.navigate(['']);
  };
}
