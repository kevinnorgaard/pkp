import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../../scroll.service';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent extends PageComponent implements OnInit {
  videoSource = '/assets/flag.mp4';

  constructor(scrollService: ScrollService) {
    super(scrollService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
