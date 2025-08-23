import {
  computed,
  effect,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Play_List } from '@app/components/cover/models/cover.model';
export interface WithId {
  id: WritableSignal<number | string>;
}

@Injectable({
  providedIn: 'root',
})
export class Store<T extends WithId> {
  constructor() {}
  currentSong: WritableSignal<T> = signal({} as T);
  playList: WritableSignal<T[]> = signal([]);
  Favourites: WritableSignal<T[]> = signal([]);
  isPlaying: WritableSignal<boolean> = signal(false);
  currentPlayList: WritableSignal<T> = signal({} as T);

  //for playlists
  currentIndex = computed(() => {
    const song = this.currentSong();
    return song ? this.playList().findIndex((t) => t.id === song.id) : -1;
  });

  hasNext = computed(() => this.currentIndex() < this.playList().length - 1);
  hasPrev = computed(() => this.currentIndex() > 0);
}
