import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-videos-form',
  templateUrl: './videos-form.component.html',
  styleUrls: ['./videos-form.component.scss']
})
export class VideosFormComponent implements OnInit {

  videosForm!: FormGroup

  constructor() {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    console.log(this.videosForm);
  }

  private initForm() {
    this.videosForm = new FormGroup({

      'VideosTitle': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'VideosDescription': new FormControl(null, [Validators.required, Validators.maxLength(50)]),

    });
  }
}
