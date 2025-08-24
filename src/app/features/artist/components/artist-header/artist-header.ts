import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
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
  ngOnInit(): void {}
  store = inject(RootStore);
  artist: WritableSignal<Artist_Model | null> = this.store.artists.current;
  useDefault = signal(false);
  @Output() playMix: EventEmitter<any> = new EventEmitter();
  onplayMix(): void {
    this.playMix.emit();
  }
}
