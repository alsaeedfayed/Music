import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Artist_Model, Song_Model } from '@app/core/models/core.models';
import { RootStore } from '@app/core/services/store/store.orcchestrator';
import { ArtistHeader } from './components/artist-header/artist-header';
import { ArtistService } from './services/artist-service';
import { Track_Api_Response } from './models/artist.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-artist',
  imports: [ArtistHeader],
  templateUrl: './artist.html',
  styleUrl: './artist.scss',
})
export class Artist implements OnInit {
  private platformID = inject(PLATFORM_ID);
  private router = inject(Router);
  artist: WritableSignal<Artist_Model> = signal({} as Artist_Model);
  store = inject(RootStore);
  private artistService = inject(ArtistService);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      const artistData = window.history.state?.artistData;
      this.artist.set(artistData);
      this.store.artists.current.set(artistData);
    }
    this.getArtistTopTracks();
  }

  getArtistTopTracks(): void {
    if (this.artist().id) {
      this.artistService.Get_Artist_tracks(this.artist().id).subscribe({
        next: (res: Track_Api_Response) => {
          console.log(res);
          const tracks: Song_Model[] | null = res.data;
          if (tracks?.length) {
            this.store.songs.setPlayList(tracks);
            console.log(
              this.store.songs.current(),
              this.store.songs.playList()
            );
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
}
