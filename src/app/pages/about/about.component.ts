import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollService } from '../../scroll.service';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent extends PageComponent implements OnInit {
  videoSource: SafeResourceUrl;

  constructor(scrollService: ScrollService, sanitizer: DomSanitizer) {
    super(scrollService);
    this.videoSource = sanitizer.bypassSecurityTrustResourceUrl(
      '/assets/flag2.mp4',
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
