import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { IDialogData } from "../../store/models/DialogData.interface";
import {YoutubeService} from "../../store/services/youtube.service";



@Component({
  selector: 'angular-modal-dialog',
  templateUrl: 'angular-modal-dialog.html',
})
export class UpdateChannelDescriptionForm {


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }




}
