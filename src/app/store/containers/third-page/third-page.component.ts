import { Component, OnInit } from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";
import {MatDialog} from "@angular/material/dialog";
import {IListsOfVideos} from "../../models/listsOfVideos.interface";
import {UpdateVideoData} from "../../../components/angular-material-modal/updateVideoData/angular-modal-video-dialog";
import {IUpdateVideoDescription} from "../../models/UpdateVideoDescription.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.scss']
})
export class ThirdPageComponent implements OnInit {

  public myVideos: IVideo[] = [];


  constructor(public youTubeService: YoutubeService,
              public matDialog: MatDialog,
              private router: Router) {
  }

  getMyVideos(): void {
    this.myVideos = []
    this.youTubeService.getVideosForChanel('UCZ1YKVCERHs3LlxsRWnv_yA', 15).subscribe((lists: IListsOfVideos) => {
      for (let element of lists.items) {
        let res: IVideo = {
          videoId: element.id.videoId,
          imgSource: element.snippet.thumbnails.medium.url,
          title: element.snippet.title,
          description: element.snippet.description.slice(0, 80)
        }
        this.myVideos.push(res)
      }
    })
  }


  ngOnInit(): void {
    this.youTubeService.authenticate()
    this.getMyVideos()
  }


  onVideoChange(videoId: string): void {


  }

  navigateOnVideoChangePage(videoId: string): void {

    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/edit_video'], {queryParams: {"&videoId=": videoId }}).then(r => {
      });
    });
  }
}
