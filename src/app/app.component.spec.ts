import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { YoutubeService } from './store/services/youtube.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent ', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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
        declarations: [AppComponent],
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
        imports: [HttpClientModule, MatMenuModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'QualifyingWork'`, () => {
    expect(component.title).toEqual('QualifyingWork');
  });
});
