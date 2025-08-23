import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Play_List } from './models/cover.model';
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
  @Input() coverData: WritableSignal<Play_List<T>> = signal({} as Play_List<T>);
  //store
  store = inject(Store);
  play = inject(Play);
  onAddToFavourites(coverData: Play_List<T>): void {}
  onPlay(coverData: Play_List<T>): void {
    this.play.playList(coverData);
    console.log(coverData);
  }

  pause() {
    this.play.pause();
  }
  onMenuAction(e: string, coverData: Play_List<T>): void {
    // Handle context menu actions
  }
}
