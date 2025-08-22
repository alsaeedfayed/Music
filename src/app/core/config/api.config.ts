import { environment } from '@env/environment.dev';

export class API_CONFIG {
  static BASE: string = environment.apiBaseUrl;
  //TODO add features and endpoints as needed

  static EXPLORE = {
    NEW_RELEASES: `${this.BASE}/chart/0/albums`,
    TOP_TRACKS: `${this.BASE}/chart/0/tracks`,
    PODCASTS: `${this.BASE}/chart/0/podcasts`,
    // ARTIST_DETAILS: 'artist/{id}',
    // ALBUM_DETAILS: 'album/{id}',
  };
  static SOUNDS = {
    ALBUM_TRACKS: (id: number | string) => `${this.BASE}/album/${id}/tracks`,
  };
}
