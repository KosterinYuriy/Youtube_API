import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {IListsOfVideos} from "../models/listsOfVideos.interface";
import {IRequestBody} from "../models/IRequestBody";
import {IUpdateChannelDescription} from "../models/UpdateChannelDescription.interface";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {


  private readonly  url = 'https://www.googleapis.com/youtube/v3/search?key='

  apiKey: string = 'AIzaSyBz1PwR8Q1abz_NIeQ0yg1rWNhK6Mmf9yw';



  putRequestBody: IRequestBody = {
    id: "UCZ1YKVCERHs3LlxsRWnv_yA",
    brandingSettings: {
      channel: {
        description: "My description5",
        defaultLanguage: "en"
      }
    }
  }

  headers = new HttpHeaders()


  constructor(public http: HttpClient,
              private authService: AuthService) {}

  authenticate(): void {
    this.authService.authenticate()
    console.log("ac", this.authService.access_token)
  };


  refreshToken(): void {
    this.authService.refreshToken()
  }



  getVideosForChanel(channel: string, maxResults: number): Observable<IListsOfVideos> {
    let SearchUrl = this.url +
      this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults

    return this.http.get<IListsOfVideos>(SearchUrl)

  }

  setHeaders(): HttpHeaders {

    return this.headers
      .set('Authorization', 'Bearer ' + this.authService.access_token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

  }


  updateChannelDescription(newDescription: string, newDefaultLanguage: string): Observable<IUpdateChannelDescription> {

    let SearchUrl = this.url + '?part=brandingSettings'

    this.putRequestBody.brandingSettings.channel.description = newDescription
    this.putRequestBody.brandingSettings.channel.defaultLanguage = newDefaultLanguage

    const headers = this.setHeaders()

    return this.http.put<IUpdateChannelDescription>(SearchUrl, this.putRequestBody, {headers})

  }

}
