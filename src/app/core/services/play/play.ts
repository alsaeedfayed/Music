import { Injectable, inject } from '@angular/core';
import { Store } from '../store/store';
import { AlbumService } from '@app/features/albums-cmp/services/tracks-service';
import { SOUND_TYPE } from '@app/core/enums/core.enums';
import { Play_List } from '@app/components/cover/models/cover.model';
import { SONG } from '@app/features/albums-cmp/models/tracks.model';
import { Player } from '@app/core/classes/player.class';

@Injectable({ providedIn: 'root' })
export class Play {
  private store = inject(Store);
  private tracksService = inject(AlbumService);

  private player = new Player(() => this.onTrackEnded());

  playList(list: Play_List<any>): void {
    this.store.currentPlayList.set(list);
    switch (list.type?.()) {
      case SOUND_TYPE.ALBUM:
        this.tracksService.Get_Album(list.id?.()!).subscribe((res) => {
          const tracks = res.data;
          this.store.playList.set(tracks);
          this.playSong(tracks[0]);
        });
        break;
      case SOUND_TYPE.TRACK:
        // handle single track
        this.store.playList.set([]);
        if (list.rawData) this.playSong(list.rawData);
        break;
      default:
        break;
    }
  }

  playSong(song: SONG): void {
    const current = this.store.currentSong();
    // Same song toggle pause/resume
    if (current && current.id === song.id) {
      this.store.isPlaying() ? this.pause() : this.resume();
      return;
    }

    // New song
    this.store.currentSong.set(song);
    this.store.isPlaying.set(true);
    this.player.play(song.preview);
  }

  pause(): void {
    this.player.pause();
    this.store.isPlaying.set(false);
  }

  resume(): void {
    this.player.resume();
    this.store.isPlaying.set(true);
  }

  next(): void {
    const idx = this.store.currentIndex();
    if (this.store.hasNext()) {
      const nextSong = this.store.playList()[idx + 1];
      this.playSong(nextSong);
    }
  }

  prev(): void {
    const idx = this.store.currentIndex();
    if (this.store.hasPrev()) {
      const prevSong = this.store.playList()[idx - 1];
      this.playSong(prevSong);
    }
  }

  private onTrackEnded(): void {
    if (this.store.hasNext()) {
      this.next(); // play next if available
    } else {
      // No next track → stop playing
      this.store.isPlaying.set(false);
      this.store.currentSong.set(null);
      // optional: clear currentPlayList if you want
      // this.store.currentPlayList.set({} as Play_List<any>);
    }
  }
}
