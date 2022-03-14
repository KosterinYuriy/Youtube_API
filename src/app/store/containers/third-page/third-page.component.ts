import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { IVideo } from '../../models/video.interface';
import { IListsOfVideos } from '../../models/listsOfVideos.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularConfirmingModalComponent } from '../../../components/angular-material-modal/confirmingDialog/angular-confirming-modal.component';
import { IVideoWithStats } from '../../models/videoWithStats.interface';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.scss'],
})
export class ThirdPageComponent implements OnInit {
  public myVideos: IVideo[] = [];
  videoStats = {
    likesCount: '0',
    ViewsCount: '0',
    commentsCount: '0',
  };

  constructor(
    public youTubeService: YoutubeService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  getVideoStatistics(videoId: string): void {
    this.youTubeService.getVideoStatistics(videoId).subscribe((res) => {
      // this.videoStats = {
      //   likesCount: res[0].statistics.likeCount,
      //   ViewsCount: res[0].statistics.viewCount,
      //   commentsCount: res[0].statistics.commentCount
      // }
      console.log('res stats', res);
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
        console.log(this.myVideos);
      });
  }

  onLike(videoId: string): void {
    this.getVideoStatistics(videoId);
    console.log(this.videoStats);
    this.youTubeService.likeState = true;
    this.youTubeService.setLikeToVideo(videoId).subscribe((res) => {
      console.log('resultLike', res);
    });

    console.log(this.videoStats.likesCount);
  }

  onDisLike(videoId: string): void {
    this.getVideoStatistics(videoId);
    console.log(this.videoStats);
    this.youTubeService.likeState = false;
    this.youTubeService.setLikeToVideo(videoId).subscribe((res) => {
      console.log('resultLike', res);
    });
  }

  openDialogOnDelete(videoId: string): void {
    const dialogRef = this.dialog.open(AngularConfirmingModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === false) {
        console.log('deleting canceled');
      } else {
        this.youTubeService.deleteVideo(videoId);
      }
    });
  }

  ngOnInit(): void {
    this.youTubeService.authenticate();
    this.getMyVideos();
    console.log('get on init');
  }

  navigateOnVideoChangePage(videoId: string): void {
    this.router.navigateByUrl('/').then(() => {
      this.router
        .navigate(['/edit_video'], {
          queryParams: {
            '&videoId=': videoId,
          },
        })
        .then((r) => {});
    });
  }
}
