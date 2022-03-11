import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { SocialAuthService } from 'angularx-social-login';
import { UpdateChannelDescriptionFormComponent } from '../../../components/angular-material-modal/angular-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { IGetProfileInfo } from '../../models/getProfileInfo.interface';
import { IVideo } from '../../models/video.interface';
import { IListsOfVideos } from '../../models/listsOfVideos.interface';
import { IGetProfilePlaylists } from '../../models/getProfilePlaylists.interface';

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

  defaultProfilePlaylists: IGetProfilePlaylists = {
    items: [
      {
        snippet: {
          title: 'default playlist title',
          description: 'default playlist description',
          thumbnails: {
            medium: {
              url: '#',
              width: 100,
              height: 100,
            },
          },
        },
      },
    ],
  };

  defaultProfileData: IGetProfileInfo = {
    items: [
      {
        snippet: {
          title: 'string',
          description: 'string',
          publishedAt: 'string',
          thumbnails: {
            default: {
              url: 'string',
              width: 300,
              height: 300,
            },
          },
        },
        statistics: {
          viewCount: '17',
          subscriberCount: '0',
          videoCount: '4',
        },
        brandingSettings: {
          channel: {
            title: 'Default title',
            description: ' Default Description',
            defaultLanguage: 'string',
          },
          image: {
            bannerExternalUrl: 'string',
          },
        },
      },
    ],
  };

  dataSource = [
    {
      name: 'Subscribers',
      weight: this.defaultProfileData.items[0].statistics.subscriberCount,
    },
    {
      name: 'View count',
      weight: this.defaultProfileData.items[0].statistics.viewCount,
    },
    {
      name: 'Videos count',
      weight: this.defaultProfileData.items[0].statistics.videoCount,
    },
  ];

  constructor(
    public youTubeService: YoutubeService,
    public socialAuthService: SocialAuthService,
    public matDialog: MatDialog
  ) {}

  refreshToken(): void {
    this.youTubeService.refreshToken();
  }

  ngOnInit(): void {
    this.youTubeService.authenticate();
    this.getMyVideos();
    this.getMyVideosPlaylists();
    this.youTubeService.getProfileInfo().subscribe((res) => {
      this.defaultProfileData = res;
      console.log(this.defaultProfileData);
    });
    this.youTubeService.getProfilePlaylists().subscribe((res) => {
      this.defaultProfilePlaylists = res;
      console.log(this.defaultProfilePlaylists);
    });
  }

  onChangeProfileData(): void {
    this.youTubeService.getProfileInfo().subscribe((res) => {
      this.defaultProfileData = res;
    });
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
        for (const i of this.youTubeService.uploadedVideos) {
          this.myVideos.push(i);
          console.log(this.myVideos);
        }
      });
  }

  getMyVideosPlaylists(): void {
    this.myVideosPlaylists = [];

    this.youTubeService.getProfilePlaylists().subscribe((res) => {
      for (const element of res.items) {
        const res: IVideo = {
          videoId: 'fakeId',
          imgSource: element.snippet.thumbnails.medium.url,
          title: element.snippet.title,
          description: element.snippet.description.slice(0, 80),
        };
        this.myVideosPlaylists.push(res);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(
      UpdateChannelDescriptionFormComponent,
      {
        width: '350px',
        data: {
          language: this.defaultLanguage,
          description: this.defaultDescription,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.youTubeService
        .updateChannelDescription(result.description, result.language)
        .subscribe((res) => {
          console.log(res);
        });
      console.log('res', result);
    });
  }
}
