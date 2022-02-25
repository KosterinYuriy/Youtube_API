import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { YoutubeService } from '../../store/services/youtube.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

describe('BoardComponent (minimal)', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
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
        declarations: [BoardComponent],
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
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
