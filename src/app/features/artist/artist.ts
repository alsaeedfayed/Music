import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Signal,
  signal,
  TemplateRef,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Artist_Model, Song_Model } from '@app/core/models/core.models';
import { RootStore } from '@app/core/services/store/store.orcchestrator';
import { ArtistHeader } from './components/artist-header/artist-header';
import { ArtistService } from './services/artist-service';
import { Track_Api_Response } from './models/artist.model';
import { first } from 'rxjs';
import { Table } from '@app/components/table/table';
import { ContextMenu } from '@app/components/context-menu/context-menu';
import { Table_Colmun } from '@app/components/table/models/table.model';
import { InfiniteScrollDirective } from '@app/directives/infinite-scroll';

@Component({
  selector: 'app-artist',
  imports: [
    CommonModule,
    ArtistHeader,
    Table,
    ContextMenu,
    InfiniteScrollDirective,
  ],
  templateUrl: './artist.html',
  styleUrl: './artist.scss',
})
export class Artist implements OnInit, AfterViewInit, OnDestroy {
  private platformID = inject(PLATFORM_ID);
  private router = inject(Router);
  artist: WritableSignal<Artist_Model> = signal({} as Artist_Model);
  store = inject(RootStore);
  private artistService = inject(ArtistService);

  @ViewChild('trackCell') trackCell!: TemplateRef<any>;
  @ViewChild('albumCell') albumCell!: TemplateRef<any>;
  @ViewChild('timeCell') timeCell!: TemplateRef<any>;
  @ViewChild('actionCell') actionCell!: TemplateRef<any>;
  isSelectable = true;
  columns = signal<Table_Colmun<Song_Model>[]>([]);
  songs = signal<Song_Model[]>([]);
  isMixPlaying: WritableSignal<boolean> = signal(false);
  limit = signal(10);
  index: WritableSignal<number | null> = signal(0);
  isLoading = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      const artistData = window.history.state?.artistData;
      this.artist.set(artistData);
      this.store.artists.current.set(artistData);
    }
    this.getArtistTopTracks();
  }

  ngAfterViewInit(): void {
    this.columns.set([
      { key: 'title', header: 'Track', cellTemplate: this.trackCell },
      { key: 'album', header: 'Album', cellTemplate: this.albumCell },
      { key: 'duration', header: 'Duration', cellTemplate: this.timeCell },
      // { key: 'action', header: 'Action', cellTemplate: this.actionCell },
    ]);
  }

  getArtistTopTracks(): void {
    this.isLoading.set(true);
    //debugger;
    //refactor // this is not ssr .. need refactor
    if (this.artist().id) {
      this.artistService
        .Get_Artist_tracks(this.artist().id, this.limit(), this.index())
        .subscribe({
          next: (res: Track_Api_Response) => {
            //loader
            this.isLoading.set(false);
            // console.log(res);
            const tracks: Song_Model[] | null = res.data;
            //for pagination
            if (res.next) {
              this.index.update((idx: any) => idx + 10);
            } else {
              this.index.set(null);
            }
            if (tracks?.length) {
              //  this.store.songs.setPlayList(tracks);
              this.store.songs.addItem(tracks);
              const songs = this.store.songs.items();
              this.store.songs.setPlayList(songs);
              this.songs.set(songs);

              // this.songs.update((current) => [...current, ...tracks]);
            }
          },
        });
    }
  }

  //pagination
  loadMoreSongs() {
    console.log(this.index());
    if (this.index()) {
      this.getArtistTopTracks();
    }
  }

  onPlayMix(): void {
    if (this.store.songs.playList()) {
      const FirstSong = this.store.songs.playList()?.[0];
      if (FirstSong) {
        this.store.songs.playSong(FirstSong);
        this.isMixPlaying.set(true);
      }
    }
  }

  playSong(song: Song_Model): void {
    this.store.songs.playSong(song);
    this.isMixPlaying.set(true);
  }
  pause(): void {
    this.store.songs.pause();
    this.isMixPlaying.set(false);
  }
  viewAlbum(albumId: number) {
    console.log('Album', albumId);
  }

  selectSong(song: any) {
    console.log('Play', song);
  }

  ngOnDestroy(): void {
    this.store.songs.clear();
  }
}
