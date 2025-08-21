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
  artist: Artist;
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
  artist: Artist;
  album: Album;
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
export interface Artist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
}
export interface Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
}
