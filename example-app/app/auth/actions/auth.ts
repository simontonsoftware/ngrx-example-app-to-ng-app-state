import { Action } from '@ngrx/store';

export const LOGOUT = '[Auth] Logout';

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type Actions = Logout;
