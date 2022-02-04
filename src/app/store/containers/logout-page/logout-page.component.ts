import {Component, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import { SocialAuthService } from "angularx-social-login";
import {UpdateChannelDescriptionForm} from "../../../components/angular-material-modal/angular-modal.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {

  defaultLanguage !: string
  defaultDescription !: string

  constructor(public youTubeService: YoutubeService,
              public socialAuthService: SocialAuthService,
              public matDialog: MatDialog,
              ) {
  }

  refreshToken(): void {
    this.youTubeService.refreshToken()
  }

  ngOnInit(): void {
    this.youTubeService.authenticate()
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
