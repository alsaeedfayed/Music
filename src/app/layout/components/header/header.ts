import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

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
}
