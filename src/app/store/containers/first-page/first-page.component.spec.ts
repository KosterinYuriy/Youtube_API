import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FirstPageComponent } from './first-page.component';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from '../../services/youtube.service';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FistPageComponent (minimal)', () => {
  let component: FirstPageComponent;
  let fixture: ComponentFixture<FirstPageComponent>;

  const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [FirstPageComponent],
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
        imports: [HttpClientModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
