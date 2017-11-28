import { Component, OnInit } from '@angular/core';
import { Authenticate } from '../models/user';
import * as Auth from '../actions/auth';
import { AuthStore } from '../state/auth-store';

@Component({
  selector: 'bc-login-page',
  template: `
    <bc-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </bc-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store('loginPage')('pending').$;
  error$ = this.store('loginPage')('error').$;

  constructor(private store: AuthStore) {}

  ngOnInit() {}

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Auth.Login($event));
  }
}
