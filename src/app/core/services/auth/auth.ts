import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register_Payload_Model } from '@app/core/models/core.models';
import { Observable } from 'rxjs';

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
}
