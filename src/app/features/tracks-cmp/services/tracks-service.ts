import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@app/core/config/api.config';
import { Observable, shareReplay } from 'rxjs';
import { TRACKS } from '../models/tracks.model';
import { Caching } from '@app/core/services/caching/caching';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private http = inject(HttpClient);
  private cacheService = inject(Caching);
  Get_Album_Tracks(albumId: number | string): Observable<TRACKS> {
    //if cached return cached observable
    const cached = this.cacheService.cache.get(albumId) as
      | Observable<TRACKS>
      | undefined;
    if (cached) {
      return cached;
    }

    const URL = API_CONFIG.SOUNDS.ALBUM_TRACKS(albumId);
    //caching
    const request$ = this.http.get<TRACKS>(URL).pipe(shareReplay(1));
    this.cacheService.Set_Cache(albumId, request$);
    //return observable
    return request$;
  }
}
