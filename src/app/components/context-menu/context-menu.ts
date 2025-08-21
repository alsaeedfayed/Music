import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  imports: [],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
})
export class ContextMenu {
  isOpen = signal(false);

  @Output() menuAction = new EventEmitter<string>();
  // actions = [
  //   { label: 'Play', value: 'play' },
  //   { label: 'Add to Playlist', value: 'add_to_playlist' },
  //   { label: 'Share', value: 'share' },
  //   { label: 'Download', value: 'download' },
  //   { label: 'Remove from Library', value: 'remove_from_library' },
  // ];
  toggleMenu() {
    this.isOpen.update((open) => !open);
  }

  actionClicked(action: string) {
    this.menuAction.emit(action);
    this.isOpen.set(false); // auto-close
  }
}
