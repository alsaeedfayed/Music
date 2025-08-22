import { Signal, signal, WritableSignal } from '@angular/core';

export interface ARTIST {
  id: Signal<number>;
  name: WritableSignal<string>;
  tracklist: WritableSignal<string>;
  type: WritableSignal<string>;
}

export interface TRACKS_DATA {
  id: Signal<number>;
  readable: WritableSignal<boolean>;
  title: WritableSignal<string>;
  title_short: WritableSignal<string>;
  title_version: WritableSignal<string>;
  isrc: WritableSignal<string>;
  link: WritableSignal<string>;
  duration: WritableSignal<number>;
  track_position: WritableSignal<number>;
  disk_number: WritableSignal<number>;
  rank: WritableSignal<number>;
  explicit_lyrics: WritableSignal<boolean>;
  explicit_content_lyrics: WritableSignal<number>;
  explicit_content_cover: WritableSignal<number>;
  preview: WritableSignal<string>;
  md5_image: WritableSignal<string>;
  artist: ARTIST;
  type: WritableSignal<string>;
}

export interface TRACKS {
  data: WritableSignal<TRACKS_DATA[]>;
  total: WritableSignal<number>;
}
