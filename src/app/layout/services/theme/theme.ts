import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private theme = signal<'light' | 'dark'>('light');
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as
        | 'light'
        | 'dark'
        | null;
      if (savedTheme) {
        this.theme.set(savedTheme);
      }
    }
    this.setTheme(this.theme());
  }
  getTheme() {
    return this.theme.asReadonly();
  }
  setTheme(theme: 'light' | 'dark') {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${theme}`);
      localStorage.setItem('theme', theme); // persist
    }
  }

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    this.setTheme(newTheme);
  }
}
