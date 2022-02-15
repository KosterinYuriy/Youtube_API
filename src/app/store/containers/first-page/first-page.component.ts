import {Component, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {IListsOfVideos} from "../../models/listsOfVideos.interface";
import {IVideo} from "../../models/video.interface";


@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})


export class FirstPageComponent implements OnInit {

  public videos: IVideo[] = [];


  constructor(public youTubeService: YoutubeService) {
  }


  getVideos(): void {
    this.videos = []
    this.youTubeService.getVideosForChanel('UCW5YeuERMmlnqo4oq8vwUpg', 15).subscribe((lists: IListsOfVideos) => {
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
    this.getVideos()
  }


}
