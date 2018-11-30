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

  constructor(private router: Router) {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('scroll-up-btn').style.visibility = 'hidden';
      } else {
        document.getElementById('scroll-up-btn').style.visibility = 'visible';
      }
      prevScrollpos = currentScrollPos;
    };
  }

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
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
