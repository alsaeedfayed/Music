import { computed, Injectable, signal, WritableSignal } from '@angular/core';
export interface WithId {
  id: number | string;
}

@Injectable({
  providedIn: 'root',
})
export class Store<T extends WithId> {
  currentTrack!: WritableSignal<T>;
  playList!: WritableSignal<T[]>;
  Favourites!: WritableSignal<T[]>;

  //for playlists
  currentIndex = computed(() => {
    const track = this.currentTrack();
    return track ? this.playList().findIndex((t: T) => t.id === track.id) : -1;
  });

  hasNext = computed(() => this.currentIndex() < this.playList().length - 1);
  hasPrev = computed(() => this.currentIndex() > 0);
}
