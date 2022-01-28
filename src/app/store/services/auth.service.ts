import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class authService {

  public user: SocialUser = new SocialUser;
  private loggedIn: boolean = false;
  public access_token = 'token'

  constructor(private socialAuthService: SocialAuthService,) {}

  authenticate(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.access_token = user.authToken
    });
    console.log("authenticated")
  }


  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID,
      {scope: "https://www.googleapis.com/auth/youtube.force-ssl"}).then(r => {
      this.access_token = r.authToken
    });
    console.log("Signed in")
    console.log("tk", this.access_token)
  }

  signOutWithGoogle(): void {
    this.socialAuthService.signOut().then(r => console.log("Signed out"));
    console.log("Signed out")
  }

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(r => {
      console.log("Token has been refreshed!")
    });
  }

}
