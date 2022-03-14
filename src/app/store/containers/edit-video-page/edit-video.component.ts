import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { IUpdateVideoData } from '../../models/UpdateVideoData.interface';
import { IUpdateVideoDescription } from '../../models/UpdateVideoDescription.interface';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IGetVideoById } from '../../models/GetVideoById.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss'],
})
export class EditVideoComponent implements OnInit {
  queryId!: string;
  videoEditForm: FormGroup = new FormGroup({});

  selectedFile: string = 'placeholder';

  public data: IUpdateVideoData = {
    title: 'test title',
    description: 'test descr',
    rusTitle: 'rus string',
    rusDescription: 'rus string',
    imgSource: this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedFile),
  };

  private querySubscription: Subscription;

  constructor(
    public youTubeService: YoutubeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this._createForm();
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: Params) => {
        this.queryId = queryParam['&videoId='];
      }
    );
  }

  get _enTitle() {
    return this.videoEditForm.get('enTitle');
  }

  get _enDescription() {
    return this.videoEditForm.get('enDescription');
  }

  get _ruTitle() {
    return this.videoEditForm.get('ruTitle');
  }

  get _ruDescription() {
    return this.videoEditForm.get('ruDescription');
  }

  setFormFields(): void {
    this.videoEditForm.setValue({
      enTitle: this.data.title,
      enDescription: this.data.description,
      ruTitle: this.data.rusTitle,
      ruDescription: this.data.rusDescription,
    });
  }

  getVideo(): void {
    this.youTubeService
      .getVideoById(this.queryId)
      .subscribe((res: IGetVideoById) => {
        for (const element of res.items) {
          this.data.title = element.snippet.title;
          this.data.description = element.snippet.description;
          this.data.rusTitle = element.localizations.ru.title;
          this.data.rusDescription = element.localizations.ru.description;
          this.data.imgSource = element.snippet.thumbnails.medium.url;
        }
        this.setFormFields();
      });
  }

  onSubmit(): void {
    console.log('submitted');
    const enTitle: string = this.videoEditForm.controls.enTitle.value;
    const enDescription: string =
      this.videoEditForm.controls.enDescription.value;
    const ruTitle: string = this.videoEditForm.controls.ruTitle.value
      ? this.videoEditForm.controls.ruTitle.value
      : this.data.rusTitle;
    const ruDescription: string = this.videoEditForm.controls.ruDescription
      .value
      ? this.videoEditForm.controls.ruDescription.value
      : this.data.rusDescription;

    if (this.queryId === 'adding_new_video') {
      if (this.selectedFile === undefined) {
        console.log('error, no img provided');
      } else {
        const LocalStorageVideo = {
          title: enTitle,
          description: enDescription,
          videoId: 'fakeId',
          imgSource: this.sanitizer.bypassSecurityTrustResourceUrl(
            this.selectedFile
          ),
        };
        this.youTubeService.uploadedVideos.push(LocalStorageVideo);
      }
    } else {
      this.youTubeService
        .updateVideoDescription(
          enDescription,
          enTitle,
          this.queryId,
          ruTitle,
          ruDescription
        )
        .subscribe((res: IUpdateVideoDescription) => {
          console.log('updateVideoDescriptionResult', res);
          this.router.navigateByUrl('/').then(() => {
            this.router.navigate(['/third']).then((r) => {});
          });
        });
    }
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/third']).then((r) => {});
    });
  }

  onCancel(): void {
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/third']).then((r) => {});
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      if (reader.result) {
        this.selectedFile = reader.result.toString();
        this.data.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.selectedFile
        );
      }
    };
  }

  ngOnInit() {
    this.youTubeService.authenticate();
    this.getVideo();
  }

  private _createForm() {
    this.videoEditForm = this.fb.group({
      enTitle: ['', [Validators.required, Validators.maxLength(40)]],
      enDescription: ['', [Validators.required, Validators.maxLength(80)]],
      ruTitle: ['', [Validators.maxLength(40)]],
      ruDescription: ['', [Validators.maxLength(80)]],
    });
  }
}
