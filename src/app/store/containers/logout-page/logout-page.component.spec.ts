import { TestBed } from '@angular/core/testing';
import { LogoutPageComponent } from './logout-page.component';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { YoutubeService } from '../../services/youtube.service';

describe('LogoutPageComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      declarations: [LogoutPageComponent],
      providers: [
        SocialAuthService,
        YoutubeService,
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: true,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  '972008513630-7avvlobhv10on2p03ibejru0vqlhgk9t.apps.googleusercontent.com'
                ),
              },
            ],
          },
        },
      ],
      imports: [RouterTestingModule, HttpClientModule, MatDialogModule],
    });
    const fixture = TestBed.createComponent(LogoutPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
