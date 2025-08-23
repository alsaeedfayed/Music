import { Signal, signal, WritableSignal } from '@angular/core';
export class Play_List<T> {
  id?: WritableSignal<string | number>;
  coverUrl?: Signal<string>;
  title?: Signal<string>;
  // subtitle?: Signal<string>;
  description?: Signal<string>;
  type?: Signal<string>;
  // link?: Signal<string>;
  rawData?: T; // keep the original data
  //if more icons
  icons?: Signal<string[]>;
  artistName?: Signal<string | number>;
  artistImg?: Signal<string>;
  artistType?: Signal<string>;
}
