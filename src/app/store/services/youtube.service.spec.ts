import { TestBed } from '@angular/core/testing';
import { YoutubeService } from './youtube.service';
import {HttpClientModule} from "@angular/common/http";



describe('YoutubeService', () => {
  let service: YoutubeService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ YoutubeService ]
    });
    service = TestBed.inject(YoutubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
