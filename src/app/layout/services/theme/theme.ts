import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private theme = signal<'light' | 'dark'>('light');
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.setTheme(this.theme());
  }
  getTheme() {
    return this.theme.asReadonly();
  }
  setTheme(theme: 'light' | 'dark') {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${theme}`);
    }
  }

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    this.setTheme(newTheme);
  }
}
