import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-context-menu',
  imports: [],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
})
export class ContextMenu implements AfterViewInit {
  ngAfterViewInit(): void {
    this.clickListener = this.rendere.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        const clickedInside = this.elRef.nativeElement.contains(event.target);
        if (!clickedInside && this.isOpen()) {
          this.isOpen.set(false);
        }
      }
    );
  }
  isOpen = signal(false);
  @Input() useDefault: boolean = false;
  @Output() menuAction = new EventEmitter<string>();
  elRef = inject(ElementRef);
  rendere = inject(Renderer2);
  private clickListener!: () => void;

  // actions = [
  //   { label: 'Play', value: 'play' },
  //   { label: 'Add to Playlist', value: 'add_to_playlist' },
  //   { label: 'Share', value: 'share' },
  //   { label: 'Download', value: 'download' },
  //   { label: 'Remove from Library', value: 'remove_from_library' },
  // ];
  toggleMenu() {
    this.isOpen.update((open) => !open);
    setTimeout(() => this.setupInternalClickHandlers(), 0);
  }

  actionClicked(action: string) {
    this.menuAction.emit(action);
    this.isOpen.set(false); // auto-close
  }

  private setupInternalClickHandlers() {
    const clickableElements = this.elRef.nativeElement.querySelectorAll(
      '.context-menu__card li, .context-menu__card button, .context-menu__card [data-close-context]'
    );
    clickableElements.forEach((el: HTMLElement) => {
      el.addEventListener('click', () => {
        this.isOpen.set(false);
      });
    });
  }
}
