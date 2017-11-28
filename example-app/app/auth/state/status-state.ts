import { User } from '../models/user';

export class StatusState {
  loggedIn = false;
  user: User | null = null;
}
