import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Cover_Model } from './models/cover.model';
import { ContextMenu } from '../context-menu/context-menu';

@Component({
  selector: 'app-cover',
  imports: [ContextMenu],
  templateUrl: './cover.html',
  styleUrl: './cover.scss',
})
export class Cover<T> {
  //cover data
  @Input() coverData: WritableSignal<Cover_Model<T>> = signal(
    {} as Cover_Model<T>
  );
  @Output() play!: EventEmitter<Cover_Model<T>>;

  onAddToFavourites(coverData: Cover_Model<T>): void {}
  onPlay(coverData: Cover_Model<T>): void {
    this.play.emit(coverData);
  }

  onMenuAction(e: string, coverData: Cover_Model<T>): void {
    // Handle context menu actions
  }
}
