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
import { ALBUMS, NEW_TRACKS, POD_CASTS } from './models/explore.model';

@Component({
  selector: 'app-home',
  imports: [Cover],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  //variables for data

  albums: WritableSignal<ALBUMS> = signal({} as ALBUMS);
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
          this.albums.set(res.albums);
          this.tracks.set(res.tracks);
          this.podcasts.set(res.podcasts);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onCustomAction(action: string) {}

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }
}
