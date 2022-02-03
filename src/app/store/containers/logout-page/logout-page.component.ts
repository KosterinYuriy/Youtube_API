import {Component, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import { SocialAuthService } from "angularx-social-login";
import {AngularModalService} from "../../../components/angular-material-modal/angular-modal.service";


@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {


  headers = new HttpHeaders()

  constructor(public youTubeService: YoutubeService,
              public socialAuthService: SocialAuthService,
              public angularModalService: AngularModalService,
              public http: HttpClient) {
  }

  refreshToken(): void {
    this.youTubeService.refreshToken()
  }

  ngOnInit(): void {
    this.youTubeService.authenticate()
  }

  onOpenDialog(): void {
    this.angularModalService.openDialog()
  }

}
