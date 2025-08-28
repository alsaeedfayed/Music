import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderState {
  requestCount = 0;
  isLoading = signal(false);
}
