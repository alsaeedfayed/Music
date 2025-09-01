// core/services/cookie.service.ts
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

// When using Angular SSR, you get REQUEST/RESPONSE from @nguniversal/express-engine
import type { Request, Response } from 'express';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

@Injectable({ providedIn: 'root' })
export class CookieService {
  private platformId = inject(PLATFORM_ID);
  request = inject<Request | null>(REQUEST, { optional: true });
  private response = inject<Response | null>(RESPONSE, { optional: true });

  get(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      // Browser side
      const match = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)')
      );
      return match ? decodeURIComponent(match[2]) : null;
    }

    if (isPlatformServer(this.platformId) && this.request) {
      return this.request.cookies?.[name] ?? null;
    }

    return null;
  }

  set(
    name: string,
    value: string,
    options?: { httpOnly?: boolean; path?: string; maxAge?: number }
  ) {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `${name}=${encodeURIComponent(value)}; path=${
        options?.path || '/'
      };`;
    }

    if (isPlatformServer(this.platformId) && this.response) {
      this.response.cookie(name, value, {
        httpOnly: options?.httpOnly ?? false,
        secure: true,
        sameSite: 'strict',
        path: options?.path || '/',
        maxAge: options?.maxAge,
      });
    }
  }

  delete(name: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    if (isPlatformServer(this.platformId) && this.response) {
      this.response.clearCookie(name);
    }
  }
}
