import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register_Payload_Model } from '@app/core/models/core.models';
import { Observable } from 'rxjs';
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
}
