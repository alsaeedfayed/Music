import { Song_Model } from '@app/core/models/core.models';

export interface ARTIST {
  id: number;
  name: string;
  tracklist: string;
  type: string;
}

export interface ALBUM {
  data: Song_Model[];
  total: number;
}
