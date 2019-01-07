import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Observable } from 'rxjs';
import { Form } from '../recruitment/form.model';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

export class Alumni {
  public constructor(
    public fullName: string,
    public email: string
  ) {  }
}

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent {
  user: Observable<firebase.User>;
  form: Alumni = new Alumni('', '');
  enabled = true;
  submitButtonMessage = 'Subscribe';

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private dialog: MatDialog) {
    this.user = this.afAuth.authState; // Update
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

  invalid(): boolean {
    return !this.enabled || this.form.fullName === '' || this.form.email === '';
  }

  onSubmit() {
    if (this.invalid()) {
      console.log('Invalid Form: Failed to save form to Firebase');
      return;
    }
    const updates = {};
    for (const item in JSON.parse(JSON.stringify(this.form))) {
      if (this.form[item] !== '') {
        updates['/alumni/' + item + '/' + this.form.fullName] = this.form[item];
      }
    }
    firebase.database().ref().update(updates, function(error) {
      if (error) {
        // The write failed...
        console.log('Failed to save form to Firebase');
      } else {
        // Data saved successfully!
        console.log('Successfully saved form to Firebase!');
      }
    });
    this.enabled = false;
    this.submitButtonMessage = 'Successfully enrolled!';
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
