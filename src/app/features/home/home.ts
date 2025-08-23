import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { Explore } from './services/explore';
import { Cover } from '@app/components/cover/cover';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import {
  ALBUM_DATA,
  NEW_TRACKS,
  POD_CASTS,
  TRACKS_DATA,
} from './models/explore.model';
import { Play_List } from '@app/components/cover/models/cover.model';
// Swiper imports
import Swiper from 'swiper';
import { SwipperCmp } from '@app/components/swipper/swipper';
import { sign } from 'node:crypto';
import { WritableSignal } from '@angular/core';
import { Caching } from '@app/core/services/caching/caching';
import { AlbumService } from '../albums-cmp/services/tracks-service';
import { ACTIONS } from '@app/core/enums/core.enums';
import { Router } from '@angular/router';
import { POD_CAST_DATA } from './models/explore.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Cover, SwipperCmp],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  // Signals for data
  albums: WritableSignal<WritableSignal<Play_List<ALBUM_DATA>>[]> = signal([]);

  tracks: WritableSignal<WritableSignal<Play_List<TRACKS_DATA>>[]> = signal([]);

  podcasts: WritableSignal<WritableSignal<Play_List<POD_CAST_DATA>>[]> = signal(
    []
  );

  private $destroy = new Subject<void>();
  private exploreService = inject(Explore);
  private albumService = inject(AlbumService);
  private cacheService = inject(Caching);
  private trackId: WritableSignal<string | number> = signal('');
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    forkJoin({
      albums: this.exploreService.Get_New_Releases(),
      tracks: this.exploreService.Get_Top_Tracks(),
      podcasts: this.exploreService.Get_Pod_Casts(),
    })
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (res) => {
          if (res.albums?.data?.length) {
            const albumsCover = res.albums.data.map((album) =>
              signal<Play_List<ALBUM_DATA>>({
                id: signal(album.id),
                coverUrl: signal(album.cover_medium),
                rawData: album,
                title: signal(album.title),
                type: signal(album.type),
                icons: signal(['bx bx-share']),
                artistName: signal(album.artist.name),
                artistImg: signal(album.artist.picture_small),
                artistType: signal(album.artist.type),
              })
            );
            this.albums.set(albumsCover);
          }

          if (res.tracks?.data?.length) {
            const tracksCover = res.tracks.data.map((track) =>
              signal<Play_List<TRACKS_DATA>>({
                id: signal(track.id),
                coverUrl: signal(track.album.cover_medium),
                title: signal(track.title),
                type: signal(track.type),
                rawData: track,
                artistName: signal(track.artist.name),
                artistImg: signal(track.artist.picture_small),
                artistType: signal(track.artist.type),
              })
            );
            this.tracks.set(tracksCover);
          }

          if (res.podcasts?.data?.length) {
            const podcastCover = res.podcasts.data.map((podcast) =>
              signal<Play_List<POD_CAST_DATA>>({
                id: signal(podcast.id),
                coverUrl: signal(podcast.picture_medium),
                title: signal(podcast.title),
                type: signal(podcast.type),
                artistName: signal(podcast.fans),
                rawData: podcast,
              })
            );
            this.podcasts.set(podcastCover);
          }
        },
        error: (err) => {
          console.error('Explore data fetch error:', err);
        },
      });
  }

  ngAfterViewInit(): void {}

  onCustomAction(
    action: string,
    albumSignal: WritableSignal<Play_List<ALBUM_DATA>>
  ) {
    console.log('Custom Action:', action, albumSignal());
  }

  onMenuActionAlbum(
    action: string,
    data: WritableSignal<Play_List<ALBUM_DATA>>
  ) {
    switch (action) {
      case ACTIONS.SHARE:
        break;
      case ACTIONS.ARTIST:
        this.router.navigate(['/artist', data().rawData?.artist.name], {
          state: {
            artistData: data().rawData?.artist,
          },
        });
        break;
    }
  }

  onMenuActionTracks(
    action: string,
    data: WritableSignal<Play_List<TRACKS_DATA>>
  ) {
    switch (action) {
      case ACTIONS.SHARE:
        break;
      case ACTIONS.ARTIST:
        console.log(data().rawData);
        break;
    }
  }

  onMenuActionPodcasts(
    action: string,
    data: WritableSignal<Play_List<POD_CAST_DATA>>
  ) {
    switch (action) {
      case ACTIONS.SHARE:
        break;
      case ACTIONS.ARTIST:
        console.log(data().rawData);
        break;
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
