import {
  computed,
  effect,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Play_List } from '@app/components/cover/models/cover.model';
import { SongActions } from './song/song.actions';
export interface WithId {
  id: WritableSignal<number | string>;
}

@Injectable({
  providedIn: 'root',
})
export class RootStore {
  constructor(public songs: SongActions) {}
}
