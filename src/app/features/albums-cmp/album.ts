import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  Signal,
  TemplateRef,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { TrackHeaderpage } from '@app/components/track-headerpage/track-headerpage';
import { Album_Model, Song_Model } from '@app/core/models/core.models';
import { RootStore } from '@app/core/services/store/store.orcchestrator';
import { title } from 'process';
import { AlbumService } from './services/tracks-service';
import { Table } from '@app/components/table/table';
import { Table_Colmun } from '@app/components/table/models/table.model';
import { ContextMenu } from '@app/components/context-menu/context-menu';

@Component({
  selector: 'app-albums-cmp',
  imports: [TrackHeaderpage, Table, ContextMenu],
  templateUrl: './albums-cmp.html',
  styleUrl: './albums-cmp.scss',
})
export class AlbumsCmp implements OnInit, AfterViewInit {
  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      const album = window.history.state.album;
      this.album.set(album);
      // console.log(album);
      this.getAlbumTracks();
    }
  }

  ngAfterViewInit(): void {
    this.columns.set([
      { key: 'title', header: 'TRACK', cellTemplate: this.titleCell },
      { key: 'artist', header: 'ARTIST', cellTemplate: this.artistCell },
      { key: 'rank', header: 'RANK' },
      { key: 'duration', header: 'Duration' },
      // { key: 'action', header: 'Action', cellTemplate: this.actionCell },
    ]);
  }

  album: WritableSignal<Album_Model | null> = signal(null);
  albumMapper = (a: Album_Model | null) =>
    a
      ? {
          title: a.title,
          cover: a.cover_medium,
          playListId: a.id,
        }
      : null;
  store = inject(RootStore);
  platFormId = inject(PLATFORM_ID);
  private albumService = inject(AlbumService);
  columns = signal<Table_Colmun<Song_Model>[]>([]);
  @ViewChild('titleCell') titleCell!: TemplateRef<any>;
  @ViewChild('artistCell') artistCell!: TemplateRef<any>;

  albumSongs: WritableSignal<Song_Model[]> = signal([]);

  getAlbumTracks(): void {
    this.albumService.Get_Album(this.album()!?.id).subscribe({
      next: (res) => {
        const album: Song_Model[] = res.data;
        this.albumSongs.set(album);
      },
      error: (err) => {},
    });
  }

  onPlayMix(): void {
    this.store.songs.playlistId = this.album()!?.id;
    this.store.songs.playList.set(this.albumSongs());
    this.store.songs.playSong(this.albumSongs()[0]);
  }
  playSong(song: Song_Model): void {
    this.store.songs.playlistId = this.album()!?.id;
    this.store.songs.playSong(song);
    this.store.songs.playList.set(this.albumSongs());
  }
  pause(): void {
    this.store.songs.pause();
  }
}
