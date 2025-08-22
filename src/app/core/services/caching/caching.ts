import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Caching<T> {
  cache = new Map<T, Observable<T>>();

  //set cache
  Set_Cache(id: T, req: Observable<T>): void {
    this.cache.set(id, req);
  }
  //clear certain cache based on change --on demand--
  Clear(id: T): void {
    this.cache.delete(id);
  }
  //clear all cache
  Clear_All(): void {
    this.cache.clear();
  }
}
