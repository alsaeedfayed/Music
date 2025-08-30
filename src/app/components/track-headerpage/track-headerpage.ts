import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Artist_Model } from '@app/core/models/core.models';
import { ContextMenu } from '../context-menu/context-menu';

@Component({
  selector: 'app-track-headerpage',
  imports: [CommonModule, ContextMenu],
  templateUrl: './track-headerpage.html',
  styleUrl: './track-headerpage.scss',
})
export class TrackHeaderpage<T> {
  data = input<T>();
  mapper = input<(data: T) => { title: string; cover: string } | null>();
  playMix = output<void>();
  onplayMix(): void {
    this.playMix.emit();
  }
}
