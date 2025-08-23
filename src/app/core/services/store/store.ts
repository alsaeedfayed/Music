import {
  computed,
  effect,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Cover_Model } from '@app/components/cover/models/cover.model';
export interface WithId {
  id: WritableSignal<number | string>;
}

@Injectable({
  providedIn: 'root',
})
export class Store<T extends WithId> {
  constructor() {}
  trackId: WritableSignal<string | number> = signal('');
  currentTrack: WritableSignal<T> = signal({} as T);
  currentSong: WritableSignal<T> = signal({} as T);
  playList: WritableSignal<T[]> = signal([]);
  Favourites: WritableSignal<T[]> = signal([]);
  isPlaying: WritableSignal<boolean> = signal(false);
  currentCover: WritableSignal<T> = signal({} as T);

  //for playlists
  currentIndex = computed(() => {
    const track = this.currentTrack();
    return track ? this.playList()?.findIndex((t: T) => t.id === track.id) : -1;
  });

  hasNext = computed(() => this.currentIndex() < this.playList().length - 1);
  hasPrev = computed(() => this.currentIndex() > 0);
}
