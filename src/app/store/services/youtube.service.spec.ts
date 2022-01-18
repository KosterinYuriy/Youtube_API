import { TestBed } from '@angular/core/testing';
import { YoutubeService } from './youtube.service';
import {HttpClientModule} from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController

} from "@angular/common/http/testing";

import mockVideos from "../../../mocks/mockVideos";


describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpController: HttpTestingController;
  const maxResults = 15;
  let fullUrl = 'https://www.googleapis.com/youtube/v3/search?key=' +
    'AIzaSyBz1PwR8Q1abz_NIeQ0yg1rWNhK6Mmf9yw' + '&channelId=' +
    "UCW5YeuERMmlnqo4oq8vwUpg" +
    '&order=date&part=snippet &type=video,id&maxResults=' + maxResults

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(YoutubeService);
    httpController = TestBed.inject(HttpTestingController);
  });


  it('should call getVideos and return an array of Videos', () => {
    service.getVideosForChanel("UCW5YeuERMmlnqo4oq8vwUpg", maxResults).subscribe((res) => {
      req.flush(mockVideos);
      expect(res.items).toEqual(mockVideos);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: fullUrl,
    });
  });
});


describe('YoutubeService2', () => {
  let service: YoutubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        YoutubeService,
      ]
    });
    service = TestBed.inject(YoutubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
