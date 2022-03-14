import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { IListsOfVideos } from '../models/listsOfVideos.interface';
import { IRequestBodyInterface } from '../models/IRequestBody.interface';
import { IUpdateChannelDescription } from '../models/UpdateChannelDescription.interface';
import { AuthService } from './auth.service';
import { ISearchListsOfVideos } from '../models/searchListsOfVideos.interface';
import { IVideo } from '../models/video.interface';
import { IUpdateVideoDescription } from '../models/UpdateVideoDescription.interface';
import { IGetVideoById } from '../models/GetVideoById.interface';
import { IGetProfileInfo } from '../models/getProfileInfo.interface';
import { IGetProfilePlaylists } from '../models/getProfilePlaylists.interface';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  public readonly url = 'https://www.googleapis.com/youtube/v3';

  apiKey: string = 'AIzaSyBz1PwR8Q1abz_NIeQ0yg1rWNhK6Mmf9yw';

  public videos: IVideo[] = [];
  public uploadedVideos: IVideo[] = [];
  public query!: string;
  public likeState: boolean = true;

  putRequestBody: IRequestBodyInterface = {
    id: 'UCZ1YKVCERHs3LlxsRWnv_yA',
    brandingSettings: {
      channel: {
        description: 'My description5',
        defaultLanguage: 'en',
      },
    },
  };

  updateRequestBody: any = {
    id: 'K-JS0CypkxE',
    snippet: {
      title: 'title10',
      categoryId: '22',
      description: '____',
    },
    localizations: {
      en: {
        description: 'en localizations',
        title: 'en title',
      },
      ru: {
        description: 'ру описание',
        title: 'ру заголвок',
      },
    },
  };

  headers = new HttpHeaders();

  constructor(public http: HttpClient, private authService: AuthService) {}

  authenticate(): void {
    this.authService.authenticate();
  }

  getVideosForChanel(
    channel: string,
    maxResults: number
  ): Observable<IListsOfVideos> {
    const SearchUrl =
      this.url +
      '/search' +
      '?key=' +
      this.apiKey +
      '&channelId=' +
      channel +
      '&order=date&part=snippet&type=video,id&maxResults=' +
      maxResults;
    return this.http.get<IListsOfVideos>(SearchUrl);
  }

  getVideosForRequest(maxResults: number): Observable<ISearchListsOfVideos> {
    const SearchUrl =
      this.url +
      '/search' +
      '?part=id&part=snippet&statistics&maxResults=' +
      maxResults +
      '&q=' +
      this.query +
      '&key=' +
      this.apiKey;

    return this.http.get<ISearchListsOfVideos>(SearchUrl);
  }

  getVideoById(videoId: string): Observable<IGetVideoById> {
    const SearchUrl =
      this.url +
      '/videos' +
      '?part=snippet%2Clocalizations' +
      '&id=' +
      videoId +
      '&key=' +
      this.apiKey;

    return this.http.get<IGetVideoById>(SearchUrl);
  }

  setHeaders(): HttpHeaders {
    return this.headers
      .set('Authorization', 'Bearer ' + this.authService.access_token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
  }

  getVideoStatistics(videoId: string): Observable<any> {
    const getVideoStatsUrl: string =
      this.url +
      '/videos?part=snippet%2Cstatistics&id=' +
      videoId +
      '&key=' +
      this.apiKey;

    const headers = this.setHeaders();

    return this.http.get(getVideoStatsUrl, { headers });
  }

  setLikeToVideo(videoId: string): Observable<any> {
    let likeOrDislike: string;

    if (this.likeState) {
      likeOrDislike = 'like';
    } else {
      likeOrDislike = 'dislike';
    }

    const setLikeUrl =
      this.url +
      '/videos/rate?id=' +
      videoId +
      '&rating=' +
      likeOrDislike +
      '&key=' +
      this.apiKey;

    const headers = this.setHeaders();
    console.log('headers', headers);

    return this.http.post(setLikeUrl, {}, { headers });
  }

  getProfileInfo(): Observable<IGetProfileInfo> {
    const profileInfoUrl =
      this.url +
      '/channels' +
      '?part=snippet&part=statistics&part=brandingSettings' +
      '&mine=true' +
      '&key=' +
      this.apiKey;

    const headers = this.setHeaders();

    return this.http.get<IGetProfileInfo>(profileInfoUrl, { headers });
  }

  getProfilePlaylists(): Observable<IGetProfilePlaylists> {
    const channelPlaylistsUrl =
      this.url + '/playlists?part=snippet&mine=true&key=' + this.apiKey;

    const headers = this.setHeaders();

    return this.http.get<IGetProfilePlaylists>(channelPlaylistsUrl, {
      headers,
    });
  }

  updateChannelDescription(
    newDescription: string,
    newDefaultLanguage: string
  ): Observable<IUpdateChannelDescription> {
    const updateChannelDescriptionUrl =
      this.url + '/channels?part=brandingSettings&key=' + this.apiKey;

    this.putRequestBody.brandingSettings.channel.description = newDescription;
    this.putRequestBody.brandingSettings.channel.defaultLanguage =
      newDefaultLanguage;

    const headers = this.setHeaders();
    console.log('headers', headers);
    console.log('body', this.putRequestBody);
    return this.http.put<IUpdateChannelDescription>(
      updateChannelDescriptionUrl,
      this.putRequestBody,
      { headers }
    );
  }

  updateVideoDescription(
    newVideoDescription: string,
    newVideoTitle: string,
    videoId: string,
    newRusTitle?: string,
    newRusDescription?: string
  ): Observable<IUpdateVideoDescription> {
    const updateVideoDescriptionUrl =
      this.url + '/videos?part=snippet%2Clocalizations&key=' + this.apiKey;
    this.updateRequestBody.id = videoId;
    this.updateRequestBody.snippet.title = newVideoTitle;
    this.updateRequestBody.snippet.description = newVideoDescription;

    if (newRusTitle === undefined || newRusDescription === undefined) {
      const headers = this.setHeaders();

      console.log('data less', this.updateRequestBody);
      console.log(headers);

      return this.http.put<IUpdateVideoDescription>(
        updateVideoDescriptionUrl,
        this.updateRequestBody,
        { headers }
      );
    } else {
      const headers = this.setHeaders();

      this.updateRequestBody.localizations.ru.title = newRusTitle;
      this.updateRequestBody.localizations.ru.description = newRusDescription;

      console.log('data full', this.updateRequestBody);
      console.log(headers);

      return this.http.put<IUpdateVideoDescription>(
        updateVideoDescriptionUrl,
        this.updateRequestBody,
        { headers }
      );
    }
  }

  deleteVideo(videoId: string): void {
    const deleteUrl = this.url + '/videos?id=' + videoId;

    const headers = this.setHeaders();

    this.http.delete(deleteUrl, { headers }).subscribe((res) => {
      console.log(res);
    });
  }
}
