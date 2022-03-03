import { YoutubeService } from '../../../store/services/youtube.service';
import { Component } from '@angular/core';

@Component({
  selector: 'angular-confirming-modal',
  templateUrl: 'angular-confirming-modal.html',
})
export class AngularConfirmingModal {
  constructor(public youTubeService: YoutubeService) {}

  onDelete(): void {}
}
