import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/scroll.service';

@Component({
  selector: 'app-philanthropy',
  templateUrl: './philanthropy.component.html',
  styleUrls: ['./philanthropy.component.css']
})
export class PhilanthropyComponent implements OnInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  scrollTop() {
    this.scrollService.scrollTop();
  }
}
