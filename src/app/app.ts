import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './layout/layout';
import { Loader } from './components/loader/loader';
import { PlayerBar } from './components/player-bar/player-bar';
import { isPlatformBrowser } from '@angular/common';
import { RootStore } from './core/services/store/store.orcchestrator';
import { Auth } from './core/services/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout, Loader, PlayerBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  showBrowserOnly = signal(false);
  store = inject(RootStore);
  private auth = inject(Auth);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      this.showBrowserOnly.set(true);
    }
    // this.auth.scheduleRefresh(this.store.auth.session()?.token!);
  }
  protected title = 'Music';
  platformID = inject(PLATFORM_ID);
}
