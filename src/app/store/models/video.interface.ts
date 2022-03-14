import { SafeResourceUrl } from '@angular/platform-browser';

export interface IVideo {
  videoId: string;
  title: string;
  description: string;
  imgSource: SafeResourceUrl;
}
