import { FormControl } from '@angular/forms';

export interface Artist_Model {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
}
export interface Album_Model {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
  position: number;
  artist: Artist_Model;
}

export interface Song_Model {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  contributors?: Contributer_Model[] | null;
  md5_image: string;
  artist: Artist_Model;
  album: Album_Model;
  type: string;
}

export interface Contributer_Model {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
  role: string;
}

export interface User_Model {
  firstName: FormControl<string>;
  middleName: FormControl<string>;
  lastName: FormControl<string>;
  mobileNo: FormControl<string>;
  emailId: FormControl<string>;
  altMobileNo: FormControl<string | null>;
  password: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  pincode: FormControl<string>;
  addressLine: FormControl<string>;
}

export interface Register_Payload_Model {
  userId: string | number;
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNo: string;
  emailId: string;
  altMobileNo: string | null;
  password: string;
  userAddress: {
    city: string;
    state: string;
    pincode: string;
    addressLine: string;
  };
  userSocialDetails: {
    facebookProfileUrl: string;
    linkdinProfileUrl: string;
    instagramHandle: string;
    twitterHandle: string;
  };
}
