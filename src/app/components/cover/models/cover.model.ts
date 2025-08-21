import { Signal, signal } from '@angular/core';
export class Cover_Model {
  id?: Signal<string | number>;
  coverUrl?: Signal<string>;
  title?: Signal<string>;
  subtitle?: Signal<string>;
  description?: Signal<string>;
  type?: Signal<string>;
  link?: Signal<string>;
  //if more icons
  icons?: Signal<string[]>;
}
