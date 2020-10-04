import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/scroll.service';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css']
})
export class ScholarshipComponent extends PageComponent implements OnInit {

  constructor(scrollService: ScrollService) {
    super(scrollService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
