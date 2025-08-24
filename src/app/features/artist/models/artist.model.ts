import { Song_Model } from '@app/core/models/core.models';

export interface Track_Api_Response {
  data: Song_Model[] | null;
  total: number;
  next: string;
}
