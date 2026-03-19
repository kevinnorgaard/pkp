import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  jumpTop(): void {
    window.scrollTo(0, 0);
  }

  scrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos = window.scrollY;
      if (pos > 0) {
        window.scrollTo(0, pos - 50);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 4);
  }

  visible(): boolean {
    return window.scrollY !== 0;
  }
}
