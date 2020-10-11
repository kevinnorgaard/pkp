import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page',
  template: ` <div>Page Component needs to be implemented.</div> `,
})
export class PageComponent implements OnInit {
  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.scrollService.jumpTop();
  }

  mode(): string {
    return environment.mode;
  }
}
