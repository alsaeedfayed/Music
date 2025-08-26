import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
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

@Component({
  selector: 'app-artist',
  imports: [CommonModule, ArtistHeader, Table, ContextMenu],
  templateUrl: './artist.html',
  styleUrl: './artist.scss',
})
export class Artist implements OnInit, AfterViewInit {
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
    //refactor // this is not ssr .. need refactor
    if (this.artist().id) {
      this.artistService.Get_Artist_tracks(this.artist().id).subscribe({
        next: (res: Track_Api_Response) => {
          // console.log(res);
          const tracks: Song_Model[] | null = res.data;
          if (tracks?.length) {
            this.store.songs.setPlayList(tracks);
            this.songs.set(tracks);
          }
        },
      });
    }
  }

  onPlayMix(): void {
    if (this.store.songs.playList()) {
      const FirstSong = this.store.songs.playList()?.[0];
      if (FirstSong) {
        this.store.songs.playSong(FirstSong);
      }
    }
  }

  playSong(song: Song_Model): void {
    this.store.songs.playSong(song);
  }

  viewAlbum(albumId: number) {
    console.log('Album', albumId);
  }

  selectSong(song: any) {
    console.log('Play', song);
  }
}
