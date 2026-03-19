import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent extends PageComponent implements OnInit {
  videoSource = 'assets/flag2.mp4';

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
