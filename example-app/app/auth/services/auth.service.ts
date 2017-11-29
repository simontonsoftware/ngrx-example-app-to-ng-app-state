import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { Authenticate } from '../models/user';
import { AuthStore } from '../state/auth-store';

@Injectable()
export class AuthService {
  constructor(private store: AuthStore, private router: Router) {}

  login(user: Authenticate) {
    this.store('loginPage').assign({
      error: null,
      pending: true,
    });

    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (user.username !== 'test') {
      this.loginFailed();
    } else {
      this.loginSucceeded();
    }
  }

  logout() {
    return of(true);
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
