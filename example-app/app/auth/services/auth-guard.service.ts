import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService
      .getLoggedIn$()
      .map(authed => {
        if (!authed) {
          this.authService.redirectToLogin();
          return false;
        }

        return true;
      })
      .take(1);
  }
}
