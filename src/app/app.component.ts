import { Component, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  @Output() displayHeader = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    this.displayHeader = window.pageYOffset !== 0;
  }
}
