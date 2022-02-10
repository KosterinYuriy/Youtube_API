import { Component, OnInit } from '@angular/core';
import { YoutubeService } from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";
import { Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {

  searchQuery: string = '12345'

  private querySubscription: Subscription;

  constructor(public youtubeService : YoutubeService,
              private route: ActivatedRoute) {
    this.querySubscription = route. queryParams.subscribe(
      (queryParam: any) => {
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
          description: element.snippet.description.slice(0, 80)
        }
        this.youtubeService.videos.push(res2)
      }
      })
  }

}
