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
import { ALBUM_DATA, NEW_TRACKS, POD_CASTS } from './models/explore.model';
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
  tracks: WritableSignal<NEW_TRACKS> = signal({} as NEW_TRACKS);
  podcasts: WritableSignal<POD_CASTS> = signal({} as POD_CASTS);

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

          this.tracks.set(res.tracks);
          this.podcasts.set(res.podcasts);
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
