import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/scroll.service';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css']
})
export class ScholarshipComponent implements OnInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit() {
  }

  scrollTop() {
    this.scrollService.scrollTop();
  }
}
