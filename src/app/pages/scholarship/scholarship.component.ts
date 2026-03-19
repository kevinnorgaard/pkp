import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css'],
})
export class ScholarshipComponent extends PageComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
  }
}
