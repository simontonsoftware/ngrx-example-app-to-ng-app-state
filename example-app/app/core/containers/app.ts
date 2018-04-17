import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { LayoutStore } from '../state/layout-store';
import { AuthService } from '../../auth/services/auth.service';

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
    private authService: AuthService,
    private layoutStore: LayoutStore
  ) {
    /**
     * To observe parts of the state use `.$`.
     */
    this.showSidenav$ = this.layoutStore('showSidenav').$;
    this.loggedIn$ = this.authService.getLoggedIn$();
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

    this.authService.logout();
  }
}
