import {Component, Inject, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {IVideo} from "../../models/video.interface";
import {IUpdateVideoData} from "../../models/UpdateVideoData.interface";
import {IUpdateVideoDescription} from "../../models/UpdateVideoDescription.interface";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IGetVideoById} from "../../models/GetVideoById.interface";


@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})


export class EditVideoComponent implements OnInit {

  public data: IUpdateVideoData = {
    title: "test title",
    description: "test descr",
    rusTitle: "rus string",
    rusDescription: "rus string",
    imgSource: '#'
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

  videoEditForm: FormGroup = new FormGroup({})

  private _createForm() {

    this.videoEditForm = this.fb.group({
      enTitle: ['', [Validators.required, Validators.maxLength(40)]],
      enDescription: ['', [Validators.required, Validators.maxLength(80)],],
      ruTitle: ['', [Validators.maxLength(40)]],
      ruDescription: ['', [Validators.maxLength(80)],],
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


  getVideo(): void {
    this.youTubeService.getVideoById(this.queryId).subscribe((res: IGetVideoById) => {
      for (let element of res.items) {
        this.data.title = element.snippet.title
        this.data.description = element.snippet.description
        this.data.rusTitle = element.localizations.ru.title
        this.data.rusDescription = element.localizations.ru.description
        this.data.imgSource = element.snippet.thumbnails.medium.url
      }
      this.setFormFields()
    })
  }

  setFormFields(): void {
    this.videoEditForm.setValue({
      'enTitle': this.data.title,
      'enDescription': this.data.description,
      'ruTitle': this.data.rusTitle,
      'ruDescription': this.data.rusDescription
    })
  }

  onChange(field: string, value: string): void {
    switch (field) {
      case 'enTitle': {
        this.data.title = value
        break
      }
      case 'enDescription': {
        this.data.description = value
        break
      }
      case 'ruTitle': {
        this.data.rusTitle = value
        break
      }
      case 'ruDescription': {
        this.data.rusDescription = value
        break
      }
    }
  }

  onSubmit(): void {

    console.log('submitted')
    const enTitle: string = this.videoEditForm.controls['enTitle'].value
    const enDescription: string = this.videoEditForm.controls['enDescription'].value
    const ruTitle: string = this.videoEditForm.controls['ruTitle'].value
      ? this.videoEditForm.controls['ruTitle'].value : this.data.rusTitle
    const ruDescription: string = this.videoEditForm.controls['ruDescription'].value
      ? this.videoEditForm.controls['ruDescription'].value : this.data.rusDescription

    this.youTubeService.updateVideoDescription(enDescription, enTitle,
      ruTitle, ruDescription, this.queryId).subscribe((res: IUpdateVideoDescription) => {

      this.router.navigateByUrl('/').then(() => {
        this.router.navigate(['/third']).then(r => {
        });
      });
    })
  }

  ngOnInit() {
    this.youTubeService.authenticate()
    this.getVideo()
  }
}
