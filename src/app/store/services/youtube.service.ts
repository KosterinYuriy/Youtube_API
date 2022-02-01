import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from "rxjs";
import {IListsOfVideos} from "../models/listsOfVideos.interface";
import {IRequestBody} from "../models/IRequestBody";
import { SocialUser} from "angularx-social-login";
import {IUpdateChannelDescription} from "../models/UpdateChannelDescription.interface";
import { authService } from "./auth.service";
import {IVideo} from "../models/video.interface";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {


  apiKey: string = 'AIzaSyBz1PwR8Q1abz_NIeQ0yg1rWNhK6Mmf9yw';

  public videos: IVideo[] = [];

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

  public user: SocialUser = new SocialUser;

  constructor(public http: HttpClient,
              private authService: authService) {}

  authenticate(): void {
    this.authService.authenticate()
    console.log("ac", this.authService.access_token)
  };

  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
  }

  signOutWithGoogle(): void {
    this.authService.signOutWithGoogle()
  }

  refreshToken(): void {
    this.authService.refreshToken()
  }



  getVideosForChanel(channel: string, maxResults: number): Subscription {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' +
      this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults

    return this.http.get<IListsOfVideos>(url).subscribe((lists: IListsOfVideos) => {
      for (let element of lists.items) {
        let res: IVideo = {
          videoId: element.id.videoId,
          imgSource: element.snippet.thumbnails.medium.url,
          title: element.snippet.title,
          description: element.snippet.description.slice(0, 80)
        }
        this.videos.push(res)
      }

    })

  }


  updateChannelDescription(newDescription: string, newDefaultLanguage: string): Observable<IUpdateChannelDescription> {

    let url = 'https://www.googleapis.com/youtube/v3/channels' + '?part=brandingSettings'

    this.putRequestBody.brandingSettings.channel.description = newDescription
    this.putRequestBody.brandingSettings.channel.defaultLanguage = newDefaultLanguage

    const headers = this.headers
      .set('Authorization', 'Bearer ' + this.authService.access_token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

     return this.http.put<IUpdateChannelDescription>(url, this.putRequestBody, {headers})

  }

}
