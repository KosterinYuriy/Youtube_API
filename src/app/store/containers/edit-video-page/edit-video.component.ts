import {Component, Inject, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";
import {IUpdateVideoData} from "../../models/UpdateVideoData.interface";
import {IUpdateVideoDescription} from "../../models/UpdateVideoDescription.interface";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})


export class EditVideoComponent implements OnInit {

  videoEditForm!: FormGroup

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
    private router: Router,
    private fb: FormBuilder,
  ) {
    this._createForm();
    this.querySubscription = route.queryParams.subscribe((queryParam: Params) => {
        this.queryId = queryParam['&videoId='];
      })
  }

  private _createForm() {
    this.videoEditForm = this.fb.group({
      enTitle: ['', [Validators.required, Validators.maxLength(40)]],
      enDescription: ['', [Validators.required, Validators.maxLength(80)],],
      ruTitle: ['', [Validators.required, Validators.maxLength(40)]],
      ruDescription: [ '', [Validators.required, Validators.maxLength(80)],],
    })

  }

  get _enTitle() {
    return this.videoEditForm.get('enTitle')!
  }

  get _enDescription() {
    return this.videoEditForm.get('enDescription')!
  }

  get _ruTitle() {
    return this.videoEditForm.get('ruTitle')!
  }

  get _ruDescription() {
    return this.videoEditForm.get('ruDescription')!
  }

  onSubmit(): void {

    const enTitle: string = this.videoEditForm.controls['enTitle'].value
    const enDescription: string = this.videoEditForm.controls['enDescription'].value
    const ruTitle: string = this.videoEditForm.controls['ruTitle'].value
    const ruDescription: string = this.videoEditForm.controls['ruDescription'].value

    this.youTubeService.updateVideoDescription( enDescription, enTitle,
      ruTitle, ruDescription, this.queryId).subscribe((res: IUpdateVideoDescription)=>{

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
