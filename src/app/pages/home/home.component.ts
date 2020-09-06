import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from 'src/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  knocksLeft = 3;
  unleashed = false;
  password: string;
  videoSource = '/assets/flag.mp4';

  constructor(private router: Router, private scrollService: ScrollService) {}

  knock() {
    this.knocksLeft = this.knocksLeft - 1;
    if (this.knocksLeft === 0) {
      this.unleashed = true;
    }
  }

  onKey(event: any) {
    if (this.password === 'mydudeee') {
      this.enter();
    }
  }

  enter() {
    this.router.navigate(['/', 'admin']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });
  }

  scrollTop() {
    this.scrollService.scrollTop();
  }
}
