import { Component, OnInit } from '@angular/core';
import { YoutubeService } from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {

  public videos: IVideo[] = []

  constructor(public youtubeService : YoutubeService) { }



  ngOnInit(): void {
    this.youtubeService.getSearchVideos().subscribe((res)=>{
      this.videos = res
    })
  }

}
