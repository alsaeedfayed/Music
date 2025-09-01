import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { ReactiveStorage } from '@app/core/services/storage/reactive-storage';
export const THEME_KEY = 'app-theme';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private theme = signal<'light' | 'dark'>('light');
  private storage = inject(ReactiveStorage);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const savedTheme = this.storage.get(THEME_KEY, 'light');
    if (savedTheme) {
      this.theme.set(savedTheme);
    }

    // Watch changes from other tabs/windows
    this.storage
      .watch<'light' | 'dark'>(THEME_KEY, savedTheme)
      .subscribe((value) => {
        if (value !== this.theme()) {
          this.theme.set(value);
          this.setTheme(value);
        }
      });

    this.setTheme(this.theme());
  }
  getTheme() {
    return this.theme.asReadonly();
  }
  setTheme(theme: 'light' | 'dark') {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${theme}`);
      this.storage.set(THEME_KEY, theme); // persist
    }
  }

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    this.setTheme(newTheme);
  }
}
