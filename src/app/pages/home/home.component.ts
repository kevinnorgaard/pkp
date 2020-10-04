import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from 'src/scroll.service';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends PageComponent implements OnInit {
  knocksLeft = 3;
  unleashed = false;
  password: string;
  videoSource = '/assets/flag.mp4';

  constructor(scrollService: ScrollService, private router: Router) {
    super(scrollService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
