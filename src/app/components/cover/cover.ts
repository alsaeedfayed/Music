import {
  Component,
  EventEmitter,
  inject,
  Input,
  output,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Play_List } from './models/cover.model';
import { ContextMenu } from '../context-menu/context-menu';
import { RootStore } from '@app/core/services/store/store.orcchestrator';
import { SOUND_TYPE } from '@app/core/enums/core.enums';

@Component({
  selector: 'app-cover',
  imports: [ContextMenu],
  templateUrl: './cover.html',
  styleUrl: './cover.scss',
})
export class Cover<T> {
  //cover data
  @Input() coverData: WritableSignal<Play_List<T>> = signal({} as Play_List<T>);
  @Output() menuAction: EventEmitter<any> = new EventEmitter();
  onCardClick = output<void>();
  //store
  store = inject(RootStore);
  // play = inject(Play);
  onAddToFavourites(coverData: Play_List<T>): void {}
  onPlayList(coverData: Play_List<T>): void {
    // this.play.playList(coverData);
    this.store.songs.playListOnClickCover(coverData);

    console.log(coverData, this.store.songs.current());
  }

  pause() {
    this.store.songs.pause();
  }
  onMenuAction(e: string, coverData: Play_List<T>): void {
    // Handle context menu actions
    this.menuAction.emit(e);
  }

  onClickCard(): void {
    this.onCardClick.emit();
  }
}
