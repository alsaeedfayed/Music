import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { BaseStore } from '../store.base';
import { Song_Model } from '@app/core/models/core.models';
import { Play_List } from '@app/components/cover/models/cover.model';

@Injectable({
  providedIn: 'root',
})
export class SongState extends BaseStore<Song_Model> {
  public isPlaying: WritableSignal<boolean> = signal(false);
  public playList: WritableSignal<Song_Model[] | null> = signal(null);
  public currentCoverPlayList: WritableSignal<Play_List<any> | null> =
    signal(null);

  currentIndex = computed<number>(() => {
    const current = this.current();
    return current
      ? this.playList()?.findIndex((s) => s.id === current.id) ?? -1
      : -1;
  });

  hasNext = computed(() => {
    const list = this.playList() ?? [];
    return this.currentIndex() < list.length - 1;
  });

  hasPrev = computed(() => this.currentIndex() > 0);
}
