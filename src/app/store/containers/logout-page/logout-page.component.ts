import {Component, ElementRef, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {YoutubeService} from "../../services/youtube.service";
import {ModalService} from "../../../components/modal";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {IListsOfVideos} from "../../models/listsOfVideos.interface";
import {IRequestBody} from "../../models/IRequestBody";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {


  public user: SocialUser = new SocialUser;
  private loggedIn: boolean = false;

  headers = new HttpHeaders()

  putRequestBody2: IRequestBody = {
    id: "UCZ1YKVCERHs3LlxsRWnv_yA",
    brandingSettings: {
      channel: {
        description: "descr",
        defaultLanguage: "ru"
      }
    }
  }


  access_token: string = "token"

  constructor(private youTubeService: YoutubeService,
              private elementRef: ElementRef,
              private socialAuthService: SocialAuthService,
              public modalService: ModalService,
              public http: HttpClient) {
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID,
      {scope: "https://www.googleapis.com/auth/youtube.force-ssl"}).then(r => {
      this.access_token = r.authToken

    });
    console.log("Signed in")
  }

  signOutWithGoogle(): void {
    this.socialAuthService.signOut().then(r => console.log("Signed out"));
  }

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(r => {
      console.log("Token has been refreshed!")
    });
  }

  ngOnInit(): void {
    //authentication
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.access_token = user.authToken
    });
  }

  request(): Subscription {

    let url = 'https://www.googleapis.com/youtube/v3/channels' + '?part=brandingSettings'

    const headers = this.headers.set('Authorization', 'Bearer ' + this.access_token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')


    return this.http.put<IListsOfVideos>(url, this.putRequestBody2, {headers}).subscribe((r)=>{
      console.log("res", r)
    })

  }

}
