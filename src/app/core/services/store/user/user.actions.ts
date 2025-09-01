import { inject, Injectable } from '@angular/core';
import { UserState } from './user.state';
import { Refresh_Token, User_Session } from '@app/core/models/core.models';
import { USER_KEY } from '@app/core/config/keys';
import { CookieService } from '../../cookies/cookie';

@Injectable({
  providedIn: 'root',
})
export class UserActions extends UserState {
  private cookies = inject(CookieService);
  setUserSession(session: User_Session): void {
    this._session.set(session);
  }

  getSession(): User_Session | null {
    return this._session();
  }

  get userToRefresh() {
    if (!this._session()) return;
    const userToRefresh: Refresh_Token = {
      emailId: this._session()?.emailId!,
      token: this._session()?.token!,
      refreshToken: this._session()?.refreshToken!,
    };
    return userToRefresh;
  }

  logOut(): void {
    this._session.set(null);
  }

  getSsrToken(): string | null {
    return this.cookies.get('token');
  }

  clearSession(): void {
    this._session.set(null);
    this.cookies.delete('token');
  }
}
