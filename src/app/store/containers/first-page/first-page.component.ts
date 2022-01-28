import {Component, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";



@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {


  constructor(public youTubeService: YoutubeService) {
  }


  ngOnInit() {
    this.youTubeService.getVideosForChanel('UCW5YeuERMmlnqo4oq8vwUpg', 15)
  }


  OnModal() {
    console.log("On Modal func")
    //todo
}

}
