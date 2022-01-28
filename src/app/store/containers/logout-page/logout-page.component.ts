import {Component, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {ModalService} from "../../../components/modal";
import {HttpHeaders, HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {


  headers = new HttpHeaders()

  constructor(public youTubeService: YoutubeService,
              public modalService: ModalService,
              public http: HttpClient) {
  }

  signInWithGoogle(): void {
    this.youTubeService.signInWithGoogle()
  }

  signOutWithGoogle(): void {
    this.youTubeService.signOutWithGoogle()
  }

  refreshToken(): void {
    this.youTubeService.refreshToken()
  }

  ngOnInit(): void {
    this.youTubeService.authenticate()
  }

}
