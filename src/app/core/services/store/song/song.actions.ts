import { inject, Injectable } from '@angular/core';
import { Player } from '@app/core/classes/player.class';
import { Song_Model } from '@app/core/models/core.models';
import { Play_List } from '@app/components/cover/models/cover.model';
import { SOUND_TYPE } from '@app/core/enums/core.enums';
import { AlbumService } from '@app/features/albums-cmp/services/tracks-service';
import { SongState } from './song.state';

@Injectable({
  providedIn: 'root',
})
export class SongActions extends SongState {
  audioPlayer = new Player(() => this.onTrackEnded());
  private albums = inject(AlbumService);
  setPlayList(list: Song_Model[] | null): void {
    this.playList.set(list);
  }
  playSong(song: Song_Model | null): void {
    //debugger;
    if (song) {
      const current = this.current();
      // Same song toggle pause/resume
      if (current && current.id === song.id) {
        this.isPlaying() ? this.pause() : this.resume();
        return;
      }
      // New song
      this.current.set(song); //set current song
      this.isPlaying.set(true);
      this.audioPlayer.play(song.preview);
      console.log(this.current());
    }
  }

  playListOnClickCover(list: Play_List<any>): void {
    switch (list.type?.()) {
      case SOUND_TYPE.ALBUM:
        this.albums.Get_Album(list.id?.()!).subscribe((res) => {
          this.currentCoverPlayList.set(list);
          //debugger;
          const tracks = res.data;
          this.setPlayList(tracks);
          // this.current.set(tracks[0]);
          this.playSong(tracks[0]); //auto play next later
        });
        break;
      case SOUND_TYPE.TRACK:
        // handle single track
        this.currentCoverPlayList.set(list);
        this.setPlayList([]);
        if (list.rawData) this.playSong(list.rawData);
        break;
      case SOUND_TYPE.PODCAST:
      //handle pod cast

      default:
        break;
    }
  }
  pause(): void {
    this.audioPlayer.pause();
    this.isPlaying.set(false);
    this.isPaused.set(true);
  }

  resume(): void {
    this.audioPlayer.resume();
    this.isPlaying.set(true);
    this.isPaused.set(false);
  }

  next(): void {
    const idx = this.currentIndex();
    const list = this.playList() ?? []; // default to empty array
    if (this.hasNext()) {
      const nextSong = list[idx + 1];
      if (nextSong) this.playSong(nextSong);
    }
  }

  playNext(): void {
    const nexSongIndex = this.currentIndex() + 1;
    const currentPlayList = this.playList() ?? [];
    const nextSong = currentPlayList[nexSongIndex];
    this.playSong(nextSong);
  }

  prev(): void {
    const idx = this.currentIndex();
    if (this.hasPrev()) {
      const list = this.playList() ?? []; // default to empty array
      const prevSong = list[idx - 1];
      this.playSong(prevSong);
    }
  }

  playPrev(): void {
    const prevSongIndex = this.currentIndex() - 1;
    const currentPlayList = this.playList() ?? [];
    const prevSong = currentPlayList[prevSongIndex];
    this.playSong(prevSong);
  }

  //clear by closing playing bar
  clearCurrent(): void {
    this.audioPlayer.stop();
    this.current.set(null);
    this.playList.set(null);
    this.isPaused.set(false);
    this.isPlaying.set(false);
  }
  private onTrackEnded(): void {
    if (this.hasNext()) {
      this.next(); // play next if available
    } else {
      // No next track → stop playing
      this.isPlaying.set(false);
      this.current.set(null);
      // optional: clear currentPlayList if you want
      // this.store.currentPlayList.set({} as Play_List<any>);
    }
  }
}
