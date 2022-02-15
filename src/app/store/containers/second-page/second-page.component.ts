import { Component, OnInit } from '@angular/core';
import { YoutubeService } from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";
import { Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {

  searchQuery!: string



  public secondPageVideos!: IVideo[]

  private querySubscription: Subscription;

  constructor(public youtubeService : YoutubeService,
              private route: ActivatedRoute) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: Params) => {
        this.searchQuery = queryParam['searchQuery'];
      }
    )
  }



    ngOnInit(): void {
    this.youtubeService.query = this.searchQuery
    this.youtubeService.getVideosForRequest(10).subscribe( (res) =>{
      this.youtubeService.videos = []

      for (let element of res.items) {
        let res2: IVideo = {
          videoId: element.id.videoId,
          imgSource: element.snippet.thumbnails.medium.url,
          title: element.snippet.title,
          description: element.snippet.description
        }
        this.youtubeService.videos.push(res2)
      }

    this.secondPageVideos = this.youtubeService.videos

      })

  }

}
