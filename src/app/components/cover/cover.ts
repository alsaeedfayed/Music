import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Cover_Model } from './models/cover.model';

@Component({
  selector: 'app-cover',
  imports: [],
  templateUrl: './cover.html',
  styleUrl: './cover.scss',
})
export class Cover<T extends Cover_Model> {
  //cover data
  @Input() coverData: WritableSignal<T> = signal({} as T);

  onAddToFavourites(coverData: WritableSignal<T>): void {}
  onShowMore(coverData: WritableSignal<T>): void {}
  onPlay(coverData: WritableSignal<T>): void {}
}
