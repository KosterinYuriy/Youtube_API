import {Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";
import {IListsOfVideos} from "../../models/listsOfVideos.interface"
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";



@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {

  videos: IVideo[] = [];
  public user: SocialUser = new SocialUser;
  private loggedIn: boolean = false;

  constructor(private youTubeService: YoutubeService,
              private elementRef:ElementRef,
              private socialAuthService: SocialAuthService) {
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(r => console.log("Signed In"));
  }

  signOutWithGoogle(): void {
    this.socialAuthService.signOut().then(r => console.log("Signed out"));
  }



  ngOnInit() {

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    this.videos = [];
    this.youTubeService.getVideosForChanel('UCW5YeuERMmlnqo4oq8vwUpg', 15)
      .subscribe((lists: IListsOfVideos) => {
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
  console.log(this.videos)

  }


  OnModal() {
    this.youTubeService.updateChannelDescription("New description")
      .subscribe((lists: Object) => {
        console.log("lists", lists)
    })
    console.log("Request sent")


}


}
