import { IVideo } from './video.interface';

export interface IVideoWithStats extends IVideo {
  likesCount: string;
  ViewsCount: string;
  commentsCount: string;
}
