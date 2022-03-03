import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { IVideo } from '../../models/video.interface';
import { IListsOfVideos } from '../../models/listsOfVideos.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularConfirmingModalComponent } from '../../../components/angular-material-modal/confirmingDialog/angular-confirming-modal.component';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.scss'],
})
export class ThirdPageComponent implements OnInit {
  public myVideos: IVideo[] = [];

  constructor(
    public youTubeService: YoutubeService,
    private router: Router,
    public dialog: MatDialog
  ) {}

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
  getMyVideos2(): void {
    this.myVideos = [];

    for (let i = 0; i < 5; i += 1) {
      const res: IVideo = {
        videoId: 'videoId' + i,
        imgSource: 'imgSource' + i,
        title: 'title' + i,
        description:
          'description description description description description description description description' +
          i,
      };
      this.myVideos.push(res);
    }
    console.log(this.myVideos);
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
