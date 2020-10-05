import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../../scroll.service';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends PageComponent implements OnInit {
  currentMode = 'rushee-profiles';

  constructor(scrollService: ScrollService) {
    super(scrollService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  changeMode(mode: string): void {
    this.currentMode = mode;
  }
}
