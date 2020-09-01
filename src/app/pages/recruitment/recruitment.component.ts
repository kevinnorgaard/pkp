import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { Observable } from 'rxjs';
import { Form } from './form.model';
import { CheckinDialogComponent } from '../../dialogs/checkin-dialog/checkin-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('snugCol') snugColumn: ElementRef;
  videoSource = 'assets/flag.mp4';

  user: Observable<firebase.User>;
  form: Form;
  enabled = true;
  signWaiver = false;
  submitButtonMessage = 'Submit';

  checkinDialogRef: MatDialogRef<CheckinDialogComponent>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private dialog: MatDialog) {
    this.user = this.afAuth.authState;
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

  ngOnInit() {
    this.videoPlayer.nativeElement.play(); // may not be necessary
  }

  onCheckin() {
    this.checkinDialogRef = this.dialog.open(CheckinDialogComponent, {
      panelClass: 'no-padding-dialog',
      height: '400px',
      width: '600px'
    });
  }

  onSignWaiver() {
    this.signWaiver = !this.signWaiver;
  }

  invalid(): boolean {
    return !this.enabled || this.form.lastName === '' || this.form.firstName === '' || this.form.email === '' || this.form.phone === '';
  }

  getSideWidth() {
    return .3225728 * this.snugColumn.nativeElement.offsetWidth;
  }

  getMiddleWidth() {
    return .3548544 * this.snugColumn.nativeElement.offsetWidth;
  }

  getRusheeKey() {
    let found = false;
    firebase.database().ref('/rushee/').once('value').then((snapshot) => {
      const keys = snapshot.val();

      for (const k in keys) { // Search for existing donor key
        if (keys[k].phone === this.form.phone) {
          this.form.id = k;
          found = true;
        }
      }
    });
    return found;
  }

  onSubmit() {
    const rusheeInfo = {};
    if (this.getRusheeKey()) {
      const rusheeRef = firebase.database().ref('rushee/' + this.form.id);
      for (const item in JSON.parse(JSON.stringify(this.form))) {
        if (this.form[item] !== '') {
          rusheeInfo['/rushee/' + item + '/' + this.form.id] = this.form[item];
        }
      }
      rusheeRef.update(rusheeInfo, function(error) {
        if (error) {
          console.log('Failed to save form to Firebase');
        } else {
          console.log('Successfully saved form to Firebase!');
        }
      });
      this.enabled = false;
      this.submitButtonMessage = 'Successfully submitted!';
    }
  }

  scrollTop() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 20);
  }
}
