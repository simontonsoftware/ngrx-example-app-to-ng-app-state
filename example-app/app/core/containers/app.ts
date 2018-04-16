import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from '../../auth/actions/auth';
import * as fromAuth from '../../auth/reducers';
import * as fromRoot from '../../reducers';
import { LayoutStore } from '../state/layout-store';

@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-layout>
      <bc-sidenav [open]="showSidenav$ | async">
        <bc-nav-item (navigate)="closeSidenav()" *ngIf="loggedIn$ | async" routerLink="/" icon="book" hint="View your book collection">
          My Collection
        </bc-nav-item>
        <bc-nav-item (navigate)="closeSidenav()" *ngIf="loggedIn$ | async" routerLink="/books/find" icon="search" hint="Find your next book!">
          Browse Books
        </bc-nav-item>
        <bc-nav-item (navigate)="closeSidenav()" *ngIf="!(loggedIn$ | async)">
          Sign In
        </bc-nav-item>
        <bc-nav-item (navigate)="logout()" *ngIf="loggedIn$ | async">
          Sign Out
        </bc-nav-item>
      </bc-sidenav>
      <bc-toolbar (openMenu)="openSidenav()">
        Book Collection
      </bc-toolbar>

      <router-outlet></router-outlet>
    </bc-layout>
  `,
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private layoutStore: LayoutStore
  ) {
    /**
     * To observe parts of the state use `.$`.
     */
    this.showSidenav$ = this.layoutStore('showSidenav').$;
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
  }

  closeSidenav() {
    /**
     * All state updates are handled through the store. This provides a clear,
     * reproducible history of state updates and user interaction through the
     * life of our application.
     */
    this.layoutStore('showSidenav').set(false);
  }

  openSidenav() {
    this.layoutStore('showSidenav').set(true);
  }

  logout() {
    this.closeSidenav();

    this.store.dispatch(new AuthActions.Logout());
  }
}
