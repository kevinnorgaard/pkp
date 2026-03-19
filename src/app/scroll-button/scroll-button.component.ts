import { Component, inject } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.css'],
})
export class ScrollButtonComponent {
  private scrollService = inject(ScrollService);

  visible(): boolean {
    return this.scrollService.visible();
  }

  scrollTop(): void {
    this.scrollService.scrollTop();
  }
}
