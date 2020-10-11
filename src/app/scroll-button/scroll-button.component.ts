import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.css'],
})
export class ScrollButtonComponent implements OnInit {
  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {}

  visible(): boolean {
    return this.scrollService.visible();
  }

  scrollTop(): void {
    this.scrollService.scrollTop();
  }
}
