import { Injectable } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public access_token = 'token';
  public user: SocialUser = new SocialUser();
  private loggedIn: boolean = false;

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {}

  authenticate(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user !== null;
      this.access_token = user.authToken;
    });
    console.log('authenticated');
  }

  signOutWithGoogle(): void {
    this.socialAuthService.signOut().then(() => console.log('Signed out'));
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate(['/login']).then(() => console.log('navigated'));
    });
  }

  refreshToken(): void {
    this.socialAuthService
      .refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        console.log('Token has been refreshed!');
      });
  }
}
