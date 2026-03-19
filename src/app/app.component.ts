import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { ScrollButtonComponent } from './scroll-button/scroll-button.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    HeaderComponent,
    BannerComponent,
    ScrollButtonComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  displayHeader = false;

  @HostListener('window:scroll')
  checkScroll(): void {
    this.displayHeader = window.scrollY !== 0;
  }
}
