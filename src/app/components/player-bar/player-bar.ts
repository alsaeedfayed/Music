import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '@app/core/classes/player.class';
import { Song_Model } from '@app/core/models/core.models';
import { RootStore } from '@app/core/services/store/store.orcchestrator';

@Component({
  selector: 'app-player-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './player-bar.html',
  styleUrl: './player-bar.scss',
})
export class PlayerBar implements OnInit {
  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      this.isBrowser = true;
    }
    this.store.songs.audioPlayer.audio?.addEventListener('timeupdate', () => {
      if (this.store.songs.audioPlayer.audio)
        this.currentTime.set(this.store.songs.audioPlayer.audio.currentTime);
    });
  }
  store = inject(RootStore);
  currentSong: WritableSignal<Song_Model | null> = this.store.songs.current;
  isPlaying: WritableSignal<boolean> = this.store.songs.isPlaying;
  platFormId = inject(PLATFORM_ID);
  isBrowser!: boolean;
  currentTime = signal(0);

  prevSong(): void {
    this.store.songs.playPrev();
  }
  nextSong(): void {
    this.store.songs.playNext();
  }

  get progress(): number {
    const song = this.store.songs.current();
    if (!song?.duration) return 0;
    return (this.currentTime() / song.duration) * 100;
  }

  formatTime(seconds: any): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  get duration(): number {
    return this.currentSong()?.duration ?? 0; // total seconds
  }

  //TODO later when we have real duration for the songs from the api response
  onSliderChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTime = +input.value;
    this.currentTime.set(newTime);
    if (this.store.songs.audioPlayer.audio)
      this.store.songs.audioPlayer.audio.currentTime = newTime; // SEEK the audio!
  }

  get progressPercent(): number {
    const total = this.duration;
    if (!total) return 0;
    return (this.currentTime() / total) * 100;
  }

  clearPlayingSong(): void {
    this.store.songs.clearCurrent();
  }
}
