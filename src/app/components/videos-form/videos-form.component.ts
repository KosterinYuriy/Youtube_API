import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ModalService} from "../modal";
import {YoutubeService} from "../../store/services/youtube.service";

@Component({
  selector: 'app-videos-form',
  templateUrl: './videos-form.component.html',
  styleUrls: ['./videos-form.component.scss']
})
export class VideosFormComponent implements OnInit {

  videosForm!: FormGroup


  constructor(public modalService: ModalService,
              private youtubeService: YoutubeService) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {

    let newDefaultLanguage = this.videosForm.get('DefLanguage')?.value
    let newDescription = this.videosForm.get('ChannelDescription')?.value
    this.youtubeService.updateChannelDescription(newDescription, newDefaultLanguage).subscribe((res) => {
      console.log(res)
    })

  };

  private initForm() {
    this.videosForm = new FormGroup({
      'DefLanguage': new FormControl(null, [Validators.required, Validators.maxLength(2)]),
      'ChannelDescription': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    });
  }
}
