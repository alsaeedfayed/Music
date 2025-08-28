// loader.interceptor.ts
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RootStore } from '../services/store/store.orcchestrator';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  // Excluded URLs (regex supported)
  excludedUrls: string[] = [
    '/auth/refresh', // example
    '/logs', // example
  ];
  //loader service
  store = inject(RootStore);
  platformID = inject(PLATFORM_ID);

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const shouldIgnore = this.excludedUrls.some((url) => req.url.includes(url));
    if (!shouldIgnore) {
      this.store.loader.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (!shouldIgnore) {
          this.store.loader.hide();
        }
      })
    );
  }
}
