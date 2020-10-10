import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  jumpTop(): void {
    window.scrollTo(0, 0);
  }

  scrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 4);
  }
}
