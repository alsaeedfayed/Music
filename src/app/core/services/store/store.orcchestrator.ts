import {
  computed,
  effect,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Play_List } from '@app/components/cover/models/cover.model';
import { SongActions } from './song/song.actions';
import { ArtistActions } from './artist/artist.actions';
import { LoaderActions } from './loader/loader.actions';
import { UserActions } from './user/user.actions';
export interface WithId {
  id: WritableSignal<number | string>;
}

@Injectable({
  providedIn: 'root',
})
export class RootStore {
  constructor(
    public songs: SongActions,
    public artists: ArtistActions,
    public loader: LoaderActions,
    public auth: UserActions
  ) {}
}
