import {
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  WritableSignal,
} from '@angular/core';
import { Store } from '../store/store';
import { isPlatformBrowser } from '@angular/common';
import { Cover_Model } from '@app/components/cover/models/cover.model';
import { SOUND_TYPE } from '@app/core/enums/core.enums';
import { TracksService } from '@app/features/tracks-cmp/services/tracks-service';
import { SONG, TRACKS } from '@app/features/tracks-cmp/models/tracks.model';

@Injectable({
  providedIn: 'root',
})
export class Play {
  private platformId = inject(PLATFORM_ID);
  private tracksService = inject(TracksService);
  constructor() {
    effect(() => {
      //handle playing  tracks , ... regarding cover
      const coverData: Cover_Model<any> = this.store.currentCover();
      if (coverData) {
        const id = coverData.id?.();
        if (id) {
          this.store.isPlaying.set(true);
          switch (coverData.type?.()) {
            case SOUND_TYPE.ALBUM:
              this.tracksService.Get_Album_Tracks(id).subscribe({
                next: (res: TRACKS) => {
                  this.store.currentTrack.set(res.data);
                  this.store.currentSong.set(res.data[0]);
                  const song: SONG = this.store.currentSong();
                  this.play(song);
                },
              });
              break;
            case SOUND_TYPE.TRACK:
              break;
            case SOUND_TYPE.PODCAST:
              break;
            case SOUND_TYPE.SONG:
              break;
            default:
              console.log('');
          }
        }
      }
    });
  }
  audio: any;
  store = inject(Store);

  play(Song: SONG): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (Song) {
      // Stop any existing audio first
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }

      // Start new audio
      this.audio = new Audio(Song.preview);
      this.audio.load();
      this.audio.play();
      this.audio.onended = () => {
        this.store.isPlaying.set(false);
        this.store.currentSong.set(null);
        this.store.currentCover.set(null);
        this.store.currentTrack.set(null);
      };
    }
  }

  pause() {
    this.audio.pause();
    this.store.isPlaying.set(false);
  }

  resume(): void {
    if (this.audio && this.audio.paused) {
      this.audio.play();
      this.store.isPlaying.set(true);
    }
  }

  // togglePlayPause() {
  //   this.store.isPlaying() ? this.pause() : this.play();
  // }

  // next() {
  //   const idx = this.store.currentIndex();
  //   if (this.store.hasNext()) {
  //     this.store.currentTrack.set(this.store.playlist()[idx + 1]);
  //   }
  // }

  // prev() {
  //   const idx = this.store.currentIndex();
  //   if (this.store.hasPrev()) {
  //     this.store.currentTrack.set(this.store.playlist()[idx - 1]);
  //   }
  // }

  // toggleFavorite(track: any) {
  //   const favs = this.store.favorites();
  //   if (favs.some((f) => f.id === track.id)) {
  //     this.store.favorites.set(favs.filter((f) => f.id !== track.id));
  //   } else {
  //     this.store.favorites.set([...favs, track]);
  //   }
  // }
}
