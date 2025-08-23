import { Album_Model, Artist_Model } from '@app/core/models/core.models';

export interface ALBUMS {
  data?: ALBUM_DATA[] | null;
  total?: number;
}
export interface ALBUM_DATA {
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  record_type: string;
  tracklist: string;
  explicit_lyrics: boolean;
  position: number;
  artist: Artist_Model;
  type: string;
}
export interface NEW_TRACKS {
  data?: TRACKS_DATA[] | null;
  total: number;
}
export interface TRACKS_DATA {
  id: number;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  position: number;
  artist: Artist_Model;
  album: Album_Model;
  type: string;
}

export interface POD_CASTS {
  data?: POD_CAST_DATA[] | null;
  total: number;
}
export interface POD_CAST_DATA {
  id: number;
  title: string;
  description: string;
  available: boolean;
  fans: number;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  type: string;
}
