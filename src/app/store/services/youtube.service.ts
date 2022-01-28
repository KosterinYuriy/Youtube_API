import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {IListsOfVideos} from "../models/listsOfVideos.interface";
import {IRequestBody} from "../models/IRequestBody";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {


  access_token: string = "token"
  apiKey: string = 'AIzaSyBz1PwR8Q1abz_NIeQ0yg1rWNhK6Mmf9yw';
  part: string = "brandingSettings"
  putRequestBody: IRequestBody = {
    id: "UCZ1YKVCERHs3LlxsRWnv_yA",
    brandingSettings: {
      channel: {
        description: "My description",
        defaultLanguage: "en"
      }
    }
  }

  headers = new HttpHeaders()

  constructor(public http: HttpClient,
              private socialAuthService: SocialAuthService,
              ) {}

  getVideosForChanel(channel: string, maxResults: number): Observable<IListsOfVideos> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' +
      this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults

    return this.http.get<IListsOfVideos>(url)
  }

  SetHeaders(access_token: string): void {
    this.headers.set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + access_token)
  }

  getAccessToken(): void{
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID,
      {scope: "https://www.googleapis.com/auth/youtube.force-ssl"}).then(r => {
      this.access_token = r.authToken
    });
    console.log("Signed in")
  }

  updateChannelDescription(newDescription: string, newDefaultLanguage: string): Observable<IListsOfVideos>{
    let url = 'https://www.googleapis.com/youtube/v3/channels' + '?part=brandingSettings'

    this.putRequestBody.brandingSettings.channel.description = newDescription
    this.putRequestBody.brandingSettings.channel.defaultLanguage = newDefaultLanguage
    console.log(this.putRequestBody)

    this.getAccessToken()

    const headers = this.headers.set('Authorization', 'Bearer ' + this.access_token)
                                .set('Accept', 'application/json')
                                .set('Content-Type', 'application/json')

    return this.http.put<IListsOfVideos>(url, this.putRequestBody, {headers})
  }
}
