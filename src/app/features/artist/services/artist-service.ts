import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Caching } from '@app/core/services/caching/caching';
import { Observable, shareReplay } from 'rxjs';
import { Track_Api_Response } from '../models/artist.model';
import { API_CONFIG } from '@app/core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private http = inject(HttpClient);
  private cacheService = inject(Caching);
  Get_Artist_tracks(
    artistId: number | string,
    limit: number,
    index: number | null
  ): Observable<Track_Api_Response> {
    //if cached return cached observable
    // const cached = this.cacheService.cache.get(
    //   artistId
    // ) as Observable<Track_Api_Response>;
    // if (cached) {
    //   return cached;
    // }

    const URL = API_CONFIG.ARTIST.TOP_TRACKS(artistId);
    //caching
    const request$ = this.http
      .get<Track_Api_Response>(`${URL}?limit=${limit}&index=${index}`)
      .pipe(shareReplay(1));
    //this.cacheService.Set_Cache(artistId, request$);
    //return observable
    return request$;
  }
}
