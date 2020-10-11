import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../../scroll.service';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-philanthropy',
  templateUrl: './philanthropy.component.html',
  styleUrls: ['./philanthropy.component.css'],
})
export class PhilanthropyComponent
  extends PageComponent
  implements OnInit {
  constructor(scrollService: ScrollService) {
    super(scrollService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
