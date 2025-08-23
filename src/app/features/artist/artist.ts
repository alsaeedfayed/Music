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
import { Artist_Model } from '@app/core/models/core.models';

@Component({
  selector: 'app-artist',
  imports: [],
  templateUrl: './artist.html',
  styleUrl: './artist.scss',
})
export class Artist implements OnInit {
  private platformID = inject(PLATFORM_ID);
  private router = inject(Router);
  artist: WritableSignal<Artist_Model> = signal({} as Artist_Model);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      const artistData = window.history.state?.artistData;
      this.artist.set(artistData);
    }
  }
}
