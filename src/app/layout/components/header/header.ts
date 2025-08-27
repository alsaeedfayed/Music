import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Theme } from '@app/layout/services/theme/theme';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() menuClicked = new EventEmitter<void>();
  searchTerm: WritableSignal<string> = signal('');
  searchResults: any[] = [];
  //inject theme service
  private themeService = inject(Theme);
  //get theme as readonly signal
  theme = this.themeService.getTheme();
  //toggle theme
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  onSearch(): void {
    this.searchResults = ['Result 1', 'Result 2', 'Result 3'];
    // if (this.searchTerm().trim()) {
    //   this.searchResults = ['Result 1', 'Result 2', 'Result 3'].filter((r) =>
    //     r.toLowerCase().includes(this.searchTerm().toLowerCase())
    //   );
    // } else {
    //   this.searchResults = [];
    // }
  }

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
