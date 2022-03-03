import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { IUpdateVideoData } from '../../models/UpdateVideoData.interface';
import { IUpdateVideoDescription } from '../../models/UpdateVideoDescription.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IGetVideoById } from '../../models/GetVideoById.interface';
import { ISelectedFile } from '../../models/SelectedFile.interface';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss'],
})
export class EditVideoComponent implements OnInit {
  queryId!: string;
  videoEditForm: FormGroup = new FormGroup({});
  selectedFile!: File;
  selectedImage: File | null = null;

  public data: IUpdateVideoData = {
    title: 'test title',
    description: 'test descr',
    rusTitle: 'rus string',
    rusDescription: 'rus string',
    imgSource: '#',
  };

  private querySubscription: Subscription;

  constructor(
    public youTubeService: YoutubeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
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
      if (this.selectedFile == undefined) {
        console.log('error, no video provided');
      } else {
        this.youTubeService
          .addVideoForChannel(enDescription, enTitle, this.selectedFile)
          .subscribe((res) => {
            console.log(res);
          });
      }
    } else {
      this.youTubeService
        .updateVideoDescription(
          enDescription,
          enTitle,
          ruTitle,
          ruDescription,
          this.queryId
        )
        .subscribe((res: IUpdateVideoDescription) => {
          this.router.navigateByUrl('/').then(() => {
            this.router.navigate(['/third']).then((r) => {});
          });
        });
    }
  }

  onCancel(): void {
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/third']).then((r) => {});
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(event: any): void {
    console.log(event[0]);
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
