import { YoutubeService } from '../../../store/services/youtube.service';
import { Component } from '@angular/core';

@Component({
  selector: 'angular-confirming-modal',
  templateUrl: 'angular-confirming-modal.component.html',
})
export class AngularConfirmingModalComponent {
  constructor(public youTubeService: YoutubeService) {}

  onDelete(): void {}
}
