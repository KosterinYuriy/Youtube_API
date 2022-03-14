import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { SocialAuthService } from 'angularx-social-login';
import { UpdateChannelDescriptionFormComponent } from '../../../components/angular-material-modal/angular-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { IGetProfileInfo } from '../../models/getProfileInfo.interface';
import { IVideo } from '../../models/video.interface';
import { IListsOfVideos } from '../../models/listsOfVideos.interface';
import { IGetProfilePlaylists } from '../../models/getProfilePlaylists.interface';
import {
  defaultProfileData,
  defaultProfilePlaylists,
} from '../../models/defaultData/defualtProfileData';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
})
export class LogoutPageComponent implements OnInit {
  public myVideos: IVideo[] = [];
  public myVideosPlaylists: IVideo[] = [];

  defaultLanguage!: string;
  defaultDescription!: string;

  displayedColumns: string[] = ['name', 'weight'];

  defaultProfilePlaylists: IGetProfilePlaylists = defaultProfilePlaylists;

  defaultProfileData: IGetProfileInfo = defaultProfileData;

  dataSource = [
    {
      name: 'Subscribers',
      weight: this._subscriberCount,
    },
    {
      name: 'View count',
      weight: this._viewCount,
    },
    {
      name: 'Videos count',
      weight: this._videoCount,
    },
  ];

  constructor(
    public youTubeService: YoutubeService,
    public socialAuthService: SocialAuthService,
    public matDialog: MatDialog
  ) {}

  get _channelTitle() {
    return this.defaultProfileData.items[0].snippet.title;
  }
  get _channelTime() {
    return this.defaultProfileData.items[0].snippet.publishedAt.substring(
      0,
      10
    );
  }

  get _channelDescription() {
    return this.defaultProfileData.items[0].snippet.description;
  }

  get _subscriberCount() {
    return this.defaultProfileData.items[0].statistics.subscriberCount;
  }
  get _viewCount() {
    return this.defaultProfileData.items[0].statistics.viewCount;
  }

  get _videoCount() {
    return this.defaultProfileData.items[0].statistics.videoCount;
  }

  getProfileInfo(): void {
    this.youTubeService.getProfileInfo().subscribe((res) => {
      this.defaultProfileData = res;
      console.log(this.defaultProfileData);
      this.dataSource = [
        {
          name: 'Subscribers',
          weight: this._subscriberCount,
        },
        {
          name: 'View count',
          weight: this._viewCount,
        },
        {
          name: 'Videos count',
          weight: this._videoCount,
        },
      ];
    });
  }

  getProfilePlaylists(): void {
    this.youTubeService.getProfilePlaylists().subscribe((res) => {
      this.defaultProfilePlaylists = res;
      console.log(this.defaultProfilePlaylists);
    });
  }

  ngOnInit(): void {
    this.youTubeService.authenticate();
    this.getMyVideos();
    this.getMyVideosPlaylists();
    this.getProfileInfo();
    this.getProfilePlaylists();
  }

  getMyVideos(): void {
    this.myVideos = [];

    this.youTubeService
      .getVideosForChanel('UCZ1YKVCERHs3LlxsRWnv_yA', 15)
      .subscribe((lists: IListsOfVideos) => {
        for (const element of lists.items) {
          const res: IVideo = {
            videoId: element.id.videoId,
            imgSource: element.snippet.thumbnails.medium.url,
            title: element.snippet.title,
            description: element.snippet.description.slice(0, 80),
          };
          this.myVideos.push(res);
        }
      });
  }

  getMyVideosPlaylists(): void {
    this.myVideosPlaylists = [];

    this.youTubeService.getProfilePlaylists().subscribe((res) => {
      for (const element of res.items) {
        const res2: IVideo = {
          videoId: 'fakeId',
          imgSource: element.snippet.thumbnails.medium.url,
          title: element.snippet.title,
          description: element.snippet.description.slice(0, 80),
        };
        this.myVideosPlaylists.push(res2);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(
      UpdateChannelDescriptionFormComponent,
      {
        width: '500px',
        data: {
          language: this.defaultLanguage,
          description: this.defaultDescription,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('res', result);
      this.youTubeService
        .updateChannelDescription(result.description, result.language)
        .subscribe((res) => {
          console.log(' updateChannelDescriptionResult', res);
        });
      console.log('res', result);
    });
  }
}
