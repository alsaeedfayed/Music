import { Injectable } from '@angular/core';
import { BaseStore } from '../store.base';
import { Artist_Model, Song_Model } from '@app/core/models/core.models';

@Injectable({
  providedIn: 'root',
})
export class ArtistState extends BaseStore<Artist_Model> {}
