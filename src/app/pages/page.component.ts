import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/scroll.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page',
    template: `
        <div>
            Page Component needs to be implemented.
        </div>
    `
})
export class PageComponent implements OnInit {

  constructor(protected scrollService: ScrollService) {}

  ngOnInit(): void {
    this.scrollService.jumpTop();
  }

  scrollTop(): void {
    this.scrollService.scrollTop();
  }

  mode(): string {
    return environment.mode;
  }
}
