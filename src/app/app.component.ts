import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  displayHeader = false;

  @HostListener('window:scroll')
  checkScroll(): void {
    this.displayHeader = window.pageYOffset !== 0;
  }
}
