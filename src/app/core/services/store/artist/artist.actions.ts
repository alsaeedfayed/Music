import { Injectable } from '@angular/core';

import { ArtistState } from './artist.state';

@Injectable({
  providedIn: 'root',
})
export class ArtistActions extends ArtistState {}
