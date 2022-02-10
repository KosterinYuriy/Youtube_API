import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../store/services/auth.service";
import {YoutubeService} from "../../store/services/youtube.service";
import {Router} from "@angular/router";


@Component({

  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']

})


export class BoardComponent implements OnInit {



  constructor(public authService: AuthService,
              private youtubeService: YoutubeService,
              private router: Router) { }


  searchRequest(searchValue: string): void {
    this.youtubeService.query = searchValue

    if (this.router.url === '/second'){
      console.log('do nothing')
    }else {
      this.router.navigateByUrl('/').then(() => {
        this.router.navigate(['/second'], { queryParams: { "searchQuery" : searchValue } } ).then(r =>{});
      });
    }
  }


  ngOnInit(): void {
  }

}
