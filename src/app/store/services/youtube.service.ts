import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {IListsOfVideos} from "../models/listsOfVideos.interface";
import {IRequestBody} from "../models/IRequestBody";
import {IUpdateChannelDescription} from "../models/UpdateChannelDescription.interface";
import {AuthService} from "./auth.service";
import {ISearchRequestBody} from "../models/searchRequestBody.interface";
import {ISearchListsOfVideos} from "../models/searchListsOfVideos.interface";
import {IVideo} from "../models/video.interface";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {


  private readonly  url = 'https://www.googleapis.com/youtube/v3/search'


  apiKey: string = 'AIzaSyBz1PwR8Q1abz_NIeQ0yg1rWNhK6Mmf9yw';

  public videos: IVideo[] = []



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

  public observableVideos: BehaviorSubject<IVideo[]>;
  public observableVideosEmpty: BehaviorSubject<IVideo[]>;

  constructor(public http: HttpClient,
              private authService: AuthService) {
    this.observableVideos = new BehaviorSubject<IVideo[]>([]);
    this.observableVideosEmpty = new BehaviorSubject<IVideo[]>([]);
  }


  getSearchVideos(): Observable<IVideo[]> {
    return this.observableVideos.asObservable();
  }

  resetSearchVideos(): void {
    this.observableVideos = this.observableVideosEmpty
  }

  setSearchVideos(newValue: IVideo[]): void {

    this.observableVideos.next(newValue);

    this.resetSearchVideos()  //try to reset the array, but it seems not working
    console.log(this.observableVideos)
  }

  authenticate(): void {
    this.authService.authenticate()
    console.log("ac", this.authService.access_token)
  };


  refreshToken(): void {
    this.authService.refreshToken()
  }



  getVideosForChanel(channel: string, maxResults: number): Observable<IListsOfVideos> {
    let SearchUrl = this.url + '?key=' +
      this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults

    return this.http.get<IListsOfVideos>(SearchUrl)

  }


  getVideosForRequest(request: string, maxResults: number): Observable<ISearchListsOfVideos> {

    let SearchUrl = this.url + '?part=id&part=snippet&maxResults='+ maxResults + '&q='+ request +'&key=' + this.apiKey

    return this.http.get<ISearchListsOfVideos>(SearchUrl)
  }


  setHeaders(): HttpHeaders {

    return this.headers
      .set('Authorization', 'Bearer ' + this.authService.access_token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

  }


  updateChannelDescription(newDescription: string, newDefaultLanguage: string): Observable<IUpdateChannelDescription> {

    let SearchUrl = this.url + '?key=' + '?part=brandingSettings'

    this.putRequestBody.brandingSettings.channel.description = newDescription
    this.putRequestBody.brandingSettings.channel.defaultLanguage = newDefaultLanguage

    const headers = this.setHeaders()

    return this.http.put<IUpdateChannelDescription>(SearchUrl, this.putRequestBody, {headers})

  }

}
