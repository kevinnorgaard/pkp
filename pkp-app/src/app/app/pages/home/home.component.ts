import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  knocksLeft = 3;
  unleashed = false;
  password: string;

  constructor(private router: Router) {}

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
}
