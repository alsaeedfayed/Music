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
  ALBUMS,
  NEW_TRACKS,
  POD_CASTS,
} from './models/explore.model';
import { Cover_Model } from '@app/components/cover/models/cover.model';

// Swiper imports
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { register } from 'swiper/element/bundle';
import { isPlatformBrowser } from '@angular/common';

// Register Swiper web components globally
register();
Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Cover],
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
  private swiperInstance?: Swiper;
  private platformId = inject(PLATFORM_ID);

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

            // Initialize Swiper after DOM is rendered
            if (isPlatformBrowser(this.platformId)) {
              setTimeout(() => this.initSwiper(), 100);
            }
          }

          this.tracks.set(res.tracks);
          this.podcasts.set(res.podcasts);
        },
        error: (err) => {
          console.error('Explore data fetch error:', err);
        },
      });
  }

  ngAfterViewInit(): void {
    // Don't init Swiper here — data might not be ready
  }

  private initSwiper() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }

    this.swiperInstance = new Swiper('.albums-swiper', {
      spaceBetween: 10,
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1400: { slidesPerView: 4 },
        1600: { slidesPerView: 5 },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

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

    // Clean up Swiper instance
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }
  }
}
