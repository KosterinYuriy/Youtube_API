import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../store/services/auth.service";
import {YoutubeService} from "../../store/services/youtube.service";
import {ISearchListsOfVideos} from "../../store/models/searchListsOfVideos.interface";
import {IVideo} from "../../store/models/video.interface";


@Component({

  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']

})


export class BoardComponent implements OnInit {

  public videos__: IVideo[] = []

  constructor(public authService: AuthService,
              private youtubeService: YoutubeService) { }


  searchRequest(searchValue: string): void {
    this.youtubeService.getVideosForRequest(searchValue, 10).subscribe((res: ISearchListsOfVideos)=>{
      console.log(res)
      for (let element of res.items) {
        let res2: IVideo = {
          videoId: element.id.videoId,
          imgSource: element.snippet.thumbnails.medium.url,
          title: element.snippet.title,
          description: element.snippet.description.slice(0, 80)
        }
        this.videos__.push(res2)
      }
      this.youtubeService.setSearchVideos(this.videos__)
      console.log(this.videos__)
    })

  }



  ngOnInit(): void {
  }

}
