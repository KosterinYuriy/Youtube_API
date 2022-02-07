import { Component, OnInit } from '@angular/core';
import { YoutubeService } from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";
import {of} from "rxjs";

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {


  constructor(public youtubeService : YoutubeService) { }


  ngOnInit(): void {

  }

}
