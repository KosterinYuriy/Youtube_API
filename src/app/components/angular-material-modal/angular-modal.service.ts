import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {UpdateChannelDescriptionForm} from "./angular-modal.component";
import {YoutubeService} from "../../store/services/youtube.service";

@Injectable({
  providedIn: 'root'
})
export class AngularModalService {

  defaultLanguage !: string
  defaultDescription !: string

  constructor(public matDialog: MatDialog,
              public youTubeService: YoutubeService,
              ) {
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(UpdateChannelDescriptionForm, {
      width: '350px',
      data: {language: this.defaultLanguage, description: this.defaultDescription},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.youTubeService.updateChannelDescription(result.description, result.language).subscribe((res)=>{
        console.log(res)
      })
      console.log("res", result)
    });
  }

}
