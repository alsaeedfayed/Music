import { inject, Injectable } from '@angular/core';
import { UserState } from './user.state';
import { User_Session } from '@app/core/models/core.models';
import { USER_KEY } from '@app/core/config/keys';

@Injectable({
  providedIn: 'root',
})
export class UserActions extends UserState {
  setUserSession(session: User_Session): void {
    this._session.set(session);
  }

  getSession(): User_Session | null {
    return this._session();
  }

  logOut(): void {
    this._session.set(null);
  }
}
