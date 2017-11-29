import { Action } from '@ngrx/store';

export const LOGOUT = '[Auth] Logout';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type Actions = LoginRedirect | Logout;
