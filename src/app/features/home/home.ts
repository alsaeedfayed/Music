import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
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

@Component({
  selector: 'app-home',
  imports: [Cover],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  //variables for data

  // albums: WritableSignal<ALBUMS> = signal({} as ALBUMS);
  albums: WritableSignal<WritableSignal<Cover_Model<ALBUM_DATA>>[]> = signal(
    []
  );

  tracks: WritableSignal<NEW_TRACKS> = signal({} as NEW_TRACKS);
  podcasts: WritableSignal<POD_CASTS> = signal({} as POD_CASTS);

  private $destroy = new Subject();
  //inject explore service
  private exploreService = inject(Explore);

  constructor() {}
  ngOnInit(): void {
    //subscribe to explore service
    forkJoin({
      albums: this.exploreService.Get_New_Releases(),
      tracks: this.exploreService.Get_Top_Tracks(),
      podcasts: this.exploreService.Get_Pod_Casts(),
    })
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (res) => {
          // this.albums.set(res.albums);
          if (res.albums.data) {
            const albumsCover: WritableSignal<Cover_Model<ALBUM_DATA>>[] =
              res.albums.data?.map((album) =>
                signal({
                  coverUrl: signal(album.cover_medium),
                  rawData: album,
                  icons: signal(['bx bx-share']),
                })
              ) ?? [];

            if (albumsCover.length > 0) {
              // console.log(albumsCover[0]?.icons?.());
              this.albums.set(albumsCover);
              console.log('albums', this.albums());
            }
          }

          this.tracks.set(res.tracks);
          this.podcasts.set(res.podcasts);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onCustomAction(action: string) {}
  onMenuAction(
    action: Event,
    albumSignal: WritableSignal<Cover_Model<ALBUM_DATA>>
  ) {
    console.log('Menu Action:', action, albumSignal());
  }
  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}
