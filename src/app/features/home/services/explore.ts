import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NEW_RELEASES, POD_CASTS, TRACKS_DATA } from '../models/explore.model';
import { API_CONFIG } from '@app/core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class Explore {
  private http = inject(HttpClient);
  Get_New_Releases(): Observable<NEW_RELEASES[]> {
    return this.http.get<NEW_RELEASES[]>(
      `${API_CONFIG.EXPLORE.NEW_RELEASES}?limit=30`
    );
  }

  Get_Top_Tracks(): Observable<TRACKS_DATA> {
    return this.http.get<TRACKS_DATA>(
      `${API_CONFIG.EXPLORE.TOP_TRACKS}?limit=30`
    );
  }

  Get_Pod_Casts(): Observable<POD_CASTS> {
    return this.http.get<POD_CASTS>(`${API_CONFIG.EXPLORE.PODCASTS}?limit=30`);
  }
}
