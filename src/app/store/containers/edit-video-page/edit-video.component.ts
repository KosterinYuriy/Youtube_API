import {Component, Inject, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";
import {IUpdateVideoData} from "../../models/UpdateVideoData.interface";
import {IUpdateVideoDescription} from "../../models/UpdateVideoDescription.interface";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})


export class EditVideoComponent implements OnInit {

  public videos: IVideo[] = [];
  public data: IUpdateVideoData = {
    title : "test title",
    description: "test descr",
    rusTitle: "rus string",
    rusDescription: "rus string",
  }

  private querySubscription: Subscription;
  queryId!: string

  constructor(
    public youTubeService: YoutubeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.querySubscription = route.queryParams.subscribe((queryParam: Params) => {
        this.queryId = queryParam['&videoId='];
      })
  }

  onSubmit(description: string, title: string,
           rusTitle: string, rusDescription: string,): void {

    console.log("id", this.queryId)

    this.youTubeService.updateVideoDescription(description, title,
      rusTitle, rusDescription, this.queryId).subscribe((res: IUpdateVideoDescription)=>{

      this.router.navigateByUrl('/').then(() => {
        this.router.navigate(['/third']).then(r => {
        });
      });
    })

  }

  ngOnInit() {
    this.youTubeService.authenticate()
  }


}
