import { Component, HostListener, ViewChild, TemplateRef, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('content') content: TemplateRef<any>;
  @Output() displayHeader = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    this.displayHeader = window.pageYOffset !== 0;
  }

  scrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 20);
  }
}
