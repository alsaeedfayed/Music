import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Cover_Model } from './models/cover.model';
import { ContextMenu } from '../context-menu/context-menu';
import { Store } from '@app/core/services/store/store';
import { SOUND_TYPE } from '@app/core/enums/core.enums';
import { Play } from '@app/core/services/play/play';

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
  //store
  store = inject(Store);
  play = inject(Play);
  onAddToFavourites(coverData: Cover_Model<T>): void {}
  onPlay(coverData: Cover_Model<T>): void {
    const currenCover: Cover_Model<T> = this.store.currentCover();
    if (currenCover) {
      if (coverData.id === currenCover.id) {
        this.play.resume();
      } else {
        this.store.currentCover.set(coverData);
      }
    } else {
      this.store.currentCover.set(coverData);
    }
    // console.log(this.store.currentCover());
  }

  pause() {
    this.store.isPlaying.set(false);
    this.play.pause();
  }
  onMenuAction(e: string, coverData: Cover_Model<T>): void {
    // Handle context menu actions
  }
}
