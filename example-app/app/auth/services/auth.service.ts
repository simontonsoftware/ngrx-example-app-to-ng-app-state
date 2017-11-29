import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate } from '../models/user';
import { AuthStore } from '../state/auth-store';
import { StatusState } from '../state/status-state';

@Injectable()
export class AuthService {
  constructor(private store: AuthStore, private router: Router) {}

  login({ username, password }: Authenticate) {
    this.store('loginPage').assign({
      error: null,
      pending: true,
    });

    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== 'test') {
      this.loginFailed();
    } else {
      this.loginSucceeded();
    }
  }

  logout() {
    this.store('status').set(new StatusState());
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  getLoggedIn$() {
    return this.store('status')('loggedIn').$;
  }

  private loginSucceeded() {
    this.store.batch(batch => {
      batch('loginPage').assign({
        error: null,
        pending: false,
      });
      batch('status').assign({
        loggedIn: true,
        user: { name: 'User' },
      });
    });
    this.router.navigate(['/']);
  }

  private loginFailed() {
    this.store('loginPage').assign({
      error: 'Invalid username or password',
      pending: false,
    });
  }
}
