import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { of } from 'rxjs';
import { YoutubeService } from '../../services/youtube.service';
import { SecondPageComponent } from './second-page.component';

describe('SecondPageComponent (minimal)', () => {
  let component: SecondPageComponent;
  let fixture: ComponentFixture<SecondPageComponent>;
  const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);

  const ActivatedRouteSpy = {
    queryParams: of(
      convertToParamMap({
        some: 'some',
        else: 'else',
      })
    ),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [SecondPageComponent],
        providers: [
          YoutubeService,
          SocialAuthService,
          {
            provide: Router,
            useValue: RouterSpy,
          },
          {
            provide: ActivatedRoute,
            useValue: ActivatedRouteSpy,
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
    fixture = TestBed.createComponent(SecondPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
