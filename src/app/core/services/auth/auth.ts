import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register_Payload_Model } from '@app/core/models/core.models';
import { Observable } from 'rxjs';
import { RootStore } from '../store/store.orcchestrator';
import { error } from 'console';
export interface Login {
  message: string;
  result: boolean;
  data: {
    userId: string | number;
    emailId: string;
    token: string;
    refreshToken: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private store = inject(RootStore);
  private refreshTimeout: any = null;

  registerNewUser(
    payload: Register_Payload_Model
  ): Observable<{ message: string; result: boolean; data: string }> {
    return this.http.post<{ message: string; result: boolean; data: string }>(
      'https://freeapi.miniprojectideas.com/api/JWT/CreateNewUser',
      payload
    );
  }

  login(payload: { emailId: string; password: string }): Observable<Login> {
    return this.http.post<Login>(
      'https://freeapi.miniprojectideas.com/api/JWT/login',
      payload
    );
  }

  refreshToken() {
    const user = this.store.auth.userToRefresh;
    return this.http
      .post('https://freeapi.miniprojectideas.com/api/JWT/refresh', user)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.scheduleRefresh(res.token);
        },
        (error) => {
          // this.scheduleRefresh(this.store.auth.session()?.token!);
          this.store.auth.clearSession();
        }
      );
  }

  scheduleRefresh(token: string): void {
    const decoded = this.decodeToken(token);
    console.log('decoded JWT', decoded);
    if (!decoded?.exp) return;

    const expiresAt = decoded.exp * 1000;
    const now = Date.now();
    const refreshAt = expiresAt - 60_000; // Refresh 1 minute before expiration

    const delay = refreshAt - now;
    if (delay <= 0) return;

    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    this.refreshTimeout = setTimeout(() => {
      this.refreshToken();
    }, delay);
  }

  clearRefreshTimer(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }
  decodeToken(token: string): { exp: number } | null {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      console.log(decoded);
      return decoded;
    } catch (e) {
      return null;
    }
  }
}
