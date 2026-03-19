import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-philanthropy',
  templateUrl: './philanthropy.component.html',
  styleUrls: ['./philanthropy.component.css'],
})
export class PhilanthropyComponent extends PageComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
  }
}
