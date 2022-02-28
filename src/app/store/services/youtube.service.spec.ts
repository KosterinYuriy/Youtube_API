import { TestBed } from '@angular/core/testing';
import { YoutubeService } from './youtube.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import mockVideos from '../../../mocks/mockVideos';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpController: HttpTestingController;
  const maxResults = 15;
  const fullUrl =
    'https://www.googleapis.com/youtube/v3/search?key=' +
    'AIzaSyBz1PwR8Q1abz_NIeQ0yg1rWNhK6Mmf9yw' +
    '&channelId=' +
    'UCW5YeuERMmlnqo4oq8vwUpg' +
    '&order=date&part=snippet &type=video,id&maxResults=' +
    maxResults;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(YoutubeService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call getVideos and return an array of Videos', () => {
    service
      .getVideosForChanel('UCW5YeuERMmlnqo4oq8vwUpg', maxResults)
      .subscribe((res) => {
        req.flush(mockVideos);
        expect(res.items).toEqual(mockVideos);
      });

    const req = httpController.expectOne({
      method: 'GET',
      url: fullUrl,
    });
  });
});

describe('YoutubeService should create', () => {
  let service: YoutubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(YoutubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
