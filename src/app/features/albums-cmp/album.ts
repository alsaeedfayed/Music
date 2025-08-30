import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { TrackHeaderpage } from '@app/components/track-headerpage/track-headerpage';
import { Album_Model } from '@app/core/models/core.models';
import { RootStore } from '@app/core/services/store/store.orcchestrator';
import { title } from 'process';

@Component({
  selector: 'app-albums-cmp',
  imports: [TrackHeaderpage],
  templateUrl: './albums-cmp.html',
  styleUrl: './albums-cmp.scss',
})
export class AlbumsCmp implements OnInit {
  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      const album = window.history.state.album;
      this.album.set(album);
      console.log(album);
    }
  }

  album: WritableSignal<Album_Model | null> = signal(null);
  albumMapper = (a: Album_Model | null) =>
    a
      ? {
          title: a.title,
          cover: a.cover_medium,
        }
      : null;

  store = inject(RootStore);
  platFormId = inject(PLATFORM_ID);
}
