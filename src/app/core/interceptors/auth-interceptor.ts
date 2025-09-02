// AuthInterceptor

//... other imports
import { RootStore } from '../services/store/store.orcchestrator';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CookieService } from '../services/cookies/cookie';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private store = inject(RootStore);
  private http = inject(HttpClient);
  private platformID = inject(PLATFORM_ID);
  private cookies = inject(CookieService);
  tokenRequiredUrls = [
    'https://freeapi.miniprojectideas.com/api/JWT/GetAllUsers',
  ];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = req.url;
    const shouldAttach = this.shouldAttachToken(url);
    if (!shouldAttach) {
      return next.handle(req);
    }
    let token: string | null = null;
    if (isPlatformBrowser(this.platformID)) {
      // Get the token from the store, which should be hydrated from the session
      token = this.store.auth.getSession()?.token || this.cookies.get('token');
      // console.log('browser cookies', this.cookies.get('token'));
    }

    if (isPlatformServer(this.platformID)) {
      // On the server, get the token from the cookies directly
      token = this.cookies.get('token');
    }

    // Check if a token exists and attach it to the request.
    if (token) {
      req = req.clone({
        setHeaders: { Autherization: `Bearer ${token}` },
      });
    }

    return next.handle(req);
  }

  private shouldAttachToken(url: string): boolean {
    return this.tokenRequiredUrls.some((api) => url.includes(api));
  }
}
