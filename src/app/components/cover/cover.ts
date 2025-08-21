import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Cover_Model } from './models/cover.model';
import { ContextMenu } from '../context-menu/context-menu';

@Component({
  selector: 'app-cover',
  imports: [ContextMenu],
  templateUrl: './cover.html',
  styleUrl: './cover.scss',
})
export class Cover<T extends Cover_Model> {
  //cover data
  @Input() coverData: WritableSignal<T> = signal({} as T);

  onAddToFavourites(coverData: WritableSignal<T>): void {}
  onPlay(coverData: WritableSignal<T>): void {}

  onMenuAction(e: string, coverData: WritableSignal<T>): void {
    // Handle context menu actions
  }
}
