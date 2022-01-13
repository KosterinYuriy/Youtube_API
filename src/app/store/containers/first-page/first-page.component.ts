import { Component, OnInit } from '@angular/core';
import {Observable, interval } from "rxjs";
import { Store, select } from '@ngrx/store';
import {NgxSpinnerService} from "ngx-spinner";
import {YoutubeService} from "../../../youtube.service";
import {takeUntil} from "rxjs/operators";



@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {

  videos: any[] = [];

  constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService) { }


  ngOnInit() {
    this.spinner.show()
    setTimeout(()=>
    {
      this.spinner.hide()
    },3000)
    this.videos = [];
    this.youTubeService
      .getVideosForChanel('UCW5YeuERMmlnqo4oq8vwUpg', 15)

      .subscribe(lists => {
        // @ts-ignore
        for (let element of lists["items"]) {
          this.videos.push(element)
        }
      });
  }

}
