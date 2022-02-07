import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../store/services/auth.service";
import {YoutubeService} from "../../store/services/youtube.service";
import {ISearchListsOfVideos} from "../../store/models/searchListsOfVideos.interface";
import {IVideo} from "../../store/models/video.interface";
import {Router} from "@angular/router";


@Component({

  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']

})


export class BoardComponent implements OnInit {

  constructor(public authService: AuthService,
              private youtubeService: YoutubeService,
              private router: Router) { }


  searchRequest(searchValue: string): void {
    this.youtubeService.getVideosForRequest(searchValue, 10).subscribe((res: ISearchListsOfVideos)=>{

      this.youtubeService.videos = []
      console.log("zero youtube videos")

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

    if (this.router.url === '/second'){
      console.log('do nothing')
    }else {
      this.router.navigateByUrl('/').then(() => {
        this.router.navigate(['/second']).then(r => console.log("navigated"));
      });
    }
  }


  ngOnInit(): void {
  }

}
