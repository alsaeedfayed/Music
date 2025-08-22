import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
  WritableSignal,
  PLATFORM_ID,
} from '@angular/core';
import { Explore } from './services/explore';
import { Cover } from '@app/components/cover/cover';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import {
  ALBUM_DATA,
  NEW_TRACKS,
  POD_CAST_DATA,
  POD_CASTS,
  TRACKS_DATA,
} from './models/explore.model';
import { Cover_Model } from '@app/components/cover/models/cover.model';
// Swiper imports
import Swiper from 'swiper';
import { SwipperCmp } from '@app/components/swipper/swipper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Cover, SwipperCmp],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  // Signals for data
  albums: WritableSignal<WritableSignal<Cover_Model<ALBUM_DATA>>[]> = signal(
    []
  );

  tracks: WritableSignal<WritableSignal<Cover_Model<TRACKS_DATA>>[]> = signal(
    []
  );

  podcasts: WritableSignal<WritableSignal<Cover_Model<POD_CAST_DATA>>[]> =
    signal([]);

  private $destroy = new Subject<void>();
  private exploreService = inject(Explore);

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
              signal<Cover_Model<ALBUM_DATA>>({
                coverUrl: signal(album.cover_medium),
                rawData: album,
                icons: signal(['bx bx-share']),
              })
            );
            this.albums.set(albumsCover);
          }

          if (res.tracks?.data?.length) {
            const tracksCover = res.tracks.data.map((track) =>
              signal<Cover_Model<TRACKS_DATA>>({
                coverUrl: signal(track.album.cover_medium),
                rawData: track,
              })
            );
            this.tracks.set(tracksCover);
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
    albumSignal: WritableSignal<Cover_Model<ALBUM_DATA>>
  ) {
    console.log('Custom Action:', action, albumSignal());
  }

  onMenuAction(
    event: Event,
    albumSignal: WritableSignal<Cover_Model<ALBUM_DATA>>
  ) {
    console.log('Menu Action:', event, albumSignal());
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
