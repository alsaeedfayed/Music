import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  output,
  WritableSignal,
} from '@angular/core';
import { Artist_Model, Song_Model } from '@app/core/models/core.models';
import { ContextMenu } from '../context-menu/context-menu';
import { RootStore } from '@app/core/services/store/store.orcchestrator';

@Component({
  selector: 'app-track-headerpage',
  imports: [CommonModule, ContextMenu],
  templateUrl: './track-headerpage.html',
  styleUrl: './track-headerpage.scss',
})
export class TrackHeaderpage<T> {
  data = input<T>();
  mapper = input<
    (data: T) => {
      title: string;
      cover: string;
      playListId?: number;
    } | null
  >();
  store = inject(RootStore);
  playMix = output<void>();
  onplayMix(): void {
    this.playMix.emit();
  }
  pause(): void {
    this.store.songs.pause();
  }
}
