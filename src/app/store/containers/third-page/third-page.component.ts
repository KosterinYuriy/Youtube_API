import { Component, OnInit } from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {

  constructor(public youtubeService : YoutubeService,
              ) { }


  ngOnInit(): void {
    this.youtubeService.authenticate()
  }


}
