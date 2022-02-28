import { Component, OnInit } from '@angular/core';
import { AuthService } from './store/services/auth.service';
import { YoutubeService } from './store/services/youtube.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'QualifyingWork';

  constructor(
    public authService: AuthService,
    private youtubeService: YoutubeService,
    private router: Router
  ) {}

  searchRequest(searchValue: string): void {
    this.router.navigateByUrl('/').then(() => {
      this.router
        .navigate(['/second'], { queryParams: { searchQuery: searchValue } })
        .then(() => {});
    });
  }
}
