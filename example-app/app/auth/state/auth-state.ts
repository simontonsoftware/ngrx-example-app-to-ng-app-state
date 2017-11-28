import { LoginPageState } from './login-page-state';
import { StatusState } from './status-state';

export class AuthState {
  status = new StatusState();
  loginPage = new LoginPageState();
}
