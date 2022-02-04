import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../store/services/auth.service";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],

})


export class BoardComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
