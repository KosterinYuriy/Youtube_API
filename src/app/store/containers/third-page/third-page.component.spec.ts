import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThirdPageComponent } from './third-page.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

describe('ThirdPageComponent (minimal)', () => {
  let component: ThirdPageComponent;
  let fixture: ComponentFixture<ThirdPageComponent>;
  const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [ThirdPageComponent],
        providers: [
          YoutubeService,
          SocialAuthService,
          {
            provide: Router,
            useValue: RouterSpy,
          },

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
        imports: [HttpClientModule, MatDialog],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
