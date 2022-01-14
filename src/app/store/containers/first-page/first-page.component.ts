import {Component, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";



@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {

  videos: IVideo[] = [];

  constructor(private youTubeService: YoutubeService) {
  }


  ngOnInit() {

    this.videos = [];
    this.youTubeService.getVideosForChanel('UCW5YeuERMmlnqo4oq8vwUpg', 15)
      .subscribe((lists: any) => {

        for (let element of lists['items']) {

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

}
