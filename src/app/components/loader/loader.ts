import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RootStore } from '@app/core/services/store/store.orcchestrator';
import { sign } from 'crypto';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader implements OnInit {
  ngOnInit(): void {
    if (isPlatformBrowser(this.platFormId)) {
      this.isBrowser = true;
    }
  }
  store = inject(RootStore);
  platFormId = inject(PLATFORM_ID);
  isBrowser!: boolean;
}
