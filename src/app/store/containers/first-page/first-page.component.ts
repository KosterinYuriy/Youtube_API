import {Component, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {IListsOfVideos} from "../../models/listsOfVideos.interface";
import {IVideo} from "../../models/video.interface";
import {SocialAuthService} from "angularx-social-login";
import {MatDialog} from "@angular/material/dialog";
import {IUpdateVideoDescription} from "../../models/UpdateVideoDescription.interface";
import {UpdateVideoData} from "../../../components/angular-material-modal/updateVideoData/angular-modal-video-dialog";


@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})


export class FirstPageComponent implements OnInit {

  public videos: IVideo[] = [];

  defaultTitle !: string
  defaultDescription !: string
  defaultRusTitle !: string
  defaultRusDescription !: string


  constructor(public youTubeService: YoutubeService,
              public matDialog: MatDialog,) {
  }


  getMyVideos(): void {
    this.videos = []
    this.youTubeService.getVideosForChanel('UCZ1YKVCERHs3LlxsRWnv_yA', 15).subscribe((lists: IListsOfVideos) => {
      console.log(lists)
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


  ngOnInit() {
    this.youTubeService.authenticate()
    this.getMyVideos()
  }

  onVideoChange(videoId: string): void {

    const dialogRef = this.matDialog.open(UpdateVideoData, {
      width: '350px',
      data: {title: this.defaultTitle, description: this.defaultDescription,
        rusTitle: this.defaultRusTitle, rusDescription: this.defaultRusDescription},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.youTubeService.updateVideoDescription(result.description, result.title,
        result.rusTitle, result.rusDescription, videoId).subscribe((res: IUpdateVideoDescription)=>{

      })
    });

  }

}
