import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ContextMenu } from '@app/components/context-menu/context-menu';
import { Artist_Model } from '@app/core/models/core.models';
import { RootStore } from '@app/core/services/store/store.orcchestrator';

@Component({
  selector: 'app-artist-header',
  imports: [ContextMenu],
  templateUrl: './artist-header.html',
  styleUrl: './artist-header.scss',
})
export class ArtistHeader implements OnInit {
  ngOnInit(): void {
    console.log('c', this.artist());
  }
  store = inject(RootStore);
  artist: WritableSignal<Artist_Model | null> = this.store.artists.current;
  useDefault = signal(false);
}
