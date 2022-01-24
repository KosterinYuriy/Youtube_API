import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IListsOfVideos} from "../models/listsOfVideos.interface";
import {IRequestBody} from "../models/IRequestBody";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey: string = 'AIzaSyBz1PwR8Q1abz_NIeQ0yg1rWNhK6Mmf9yw';
  putRequestBody: IRequestBody = {

    id: "0gor32MSyiA" // this is id for first received video
  };



  constructor(public http: HttpClient) {
  }

  getVideosForChanel(channel: string, maxResults: number): Observable<IListsOfVideos> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' +
      this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults

    return this.http.get<IListsOfVideos>(url)
  }

  updateVideoForChanel(channel: string): Observable<IListsOfVideos>{
    let url = 'https://www.googleapis.com/youtube/v3/channels' +
      this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video'


    return this.http.put<IListsOfVideos>(url, this.putRequestBody)
  }
}
