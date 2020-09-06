import { Component } from '@angular/core';
import { ScrollService } from 'src/scroll.service';

@Component({
  selector: 'app-philanthropy',
  templateUrl: './philanthropy.component.html',
  styleUrls: ['./philanthropy.component.css']
})
export class PhilanthropyComponent {

  constructor(private scrollService: ScrollService) { }

  scrollTop() {
    this.scrollService.scrollTop();
  }
}
