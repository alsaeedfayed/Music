import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@app/core/config/api.config';
import { Observable, shareReplay } from 'rxjs';
import { Caching } from '@app/core/services/caching/caching';
import { ALBUM } from '../models/tracks.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private http = inject(HttpClient);
  private cacheService = inject(Caching);
  Get_Album(albumId: number | string): Observable<ALBUM> {
    //if cached return cached observable
    const cached = this.cacheService.cache.get(albumId) as
      | Observable<ALBUM>
      | undefined;
    if (cached) {
      return cached;
    }

    const URL = API_CONFIG.SOUNDS.ALBUM(albumId);
    //caching
    const request$ = this.http.get<ALBUM>(URL).pipe(shareReplay(1));
    this.cacheService.Set_Cache(albumId, request$);
    //return observable
    return request$;
  }
}
