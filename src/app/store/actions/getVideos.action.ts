import { Action } from '@ngrx/store';
import { IUpdateVideoData } from '../models/UpdateVideoData.interface';

export enum VideosActions {
  GetVideosForChannel = '[Home Page] GetVideosForChannel',
  GetVideosForRequest = '[Second Page] GetVideosForRequest',
  GetVideoById = '[EditVideo Page] GetVideoById',
  UpdateVideoDescription = '[Third Page] UpdateVideoDescription',
  AddVideo = '[? Page] AddVideo',
}

export enum ChannelActions {
  UpdateChannelDescription = '[Profile Page] GetVideos',
}

export class GetVideoByIdAction implements Action {
  readonly type = VideosActions.GetVideoById;
  constructor(public payload: { videoId: string }) {}
}

export class GetVideosForChannelAction implements Action {
  readonly type = VideosActions.GetVideosForChannel;
  constructor(public payload: { channelId: string }) {}
}

export class GetVideosForRequestAction implements Action {
  readonly type = VideosActions.GetVideosForRequest;
  constructor(public payload: { request: string }) {}
}

export class UpdateVideoDescriptionAction implements Action {
  readonly type = VideosActions.UpdateVideoDescription;
  constructor(public payload: { data: IUpdateVideoData }) {}
}

export class UpdateChannelDescriptionAction implements Action {
  readonly type = ChannelActions.UpdateChannelDescription;
  constructor(public payload: { newDescription: string }) {}
}
