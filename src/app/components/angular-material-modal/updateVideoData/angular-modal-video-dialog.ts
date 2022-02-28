import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { IUpdateVideoData } from '../../../store/models/UpdateVideoData.interface';

@Component({
  selector: 'angular-modal-video-dialog',
  templateUrl: 'angular-modal-video-dialog.html',
})
export class UpdateVideoDataComponent {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: IUpdateVideoData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
