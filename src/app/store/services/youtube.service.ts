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
  part: string = "brandingSettings"
  putRequestBody: IRequestBody = {
    id: "UCZ1YKVCERHs3LlxsRWnv_yA",
    brandingSettings: {
      channel: {
        description: "My description"
      }
    }
  }



  constructor(public http: HttpClient) {
  }

  getVideosForChanel(channel: string, maxResults: number): Observable<IListsOfVideos> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' +
      this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults

    return this.http.get<IListsOfVideos>(url)
  }

  updateChannelDescription(newDescription: string): Observable<IListsOfVideos>{
    let url = 'https://www.googleapis.com/youtube/v3/channels' + '?part=brandingSettings'

    this.putRequestBody.brandingSettings.channel.description = newDescription
    return this.http.put<IListsOfVideos>(url, this.putRequestBody)
  }
}
