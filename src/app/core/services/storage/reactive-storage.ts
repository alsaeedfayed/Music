import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  fromEvent,
  Observable,
  Subject,
  map,
  merge,
  startWith,
  distinctUntilChanged,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReactiveStorage {
  private localChange$ = new Subject<{ key: string; value: any }>();
  private platFormId = inject(PLATFORM_ID);

  watch<T>(key: string, defaultValue: T): Observable<T> {
    if (!isPlatformBrowser(this.platFormId)) {
      return new Observable<T>((subscriber) => {
        subscriber.next(defaultValue);
        subscriber.complete();
      });
    }

    // listens to changes from other tabs
    const storageEvent$ = fromEvent<StorageEvent>(window, 'storage').pipe(
      map((event) =>
        event.key === key
          ? this.safeParse<T>(event.newValue, defaultValue)
          : null
      )
    );

    // listens to changes inside this tab
    const localsSet$ = this.localChange$.pipe(
      map((change) => (change.key === key ? (change.value as T) : null))
    );

    return merge(storageEvent$, localsSet$).pipe(
      map((value) => value ?? this.get(key, defaultValue)),
      startWith(this.get(key, defaultValue)),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  set<T>(key: string, value: T): void {
    if (!isPlatformBrowser(this.platFormId)) return;
    localStorage.setItem(key, JSON.stringify(value));
    this.localChange$.next({ key, value });
  }

  get<T>(key: string, defaultValue: T): T {
    if (!isPlatformBrowser(this.platFormId)) return defaultValue;
    return this.safeParse<T>(localStorage.getItem(key), defaultValue);
  }

  remove(key: string): void {
    if (!isPlatformBrowser(this.platFormId)) return;
    localStorage.removeItem(key);
    this.localChange$.next({ key, value: null });
  }

  private safeParse<T>(value: string | null, fallback: T): T {
    try {
      return value ? (JSON.parse(value) as T) : fallback;
    } catch {
      return fallback;
    }
  }
}
