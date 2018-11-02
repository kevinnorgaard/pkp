import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import { Form } from './form.model';
import {CheckinDialogComponent} from '../../dialogs/checkin-dialog/checkin-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('snugCol') snugColumn: ElementRef;
  videoSource = 'assets/flag.mp4';

  user: Observable<firebase.User>;
  form: Form = new Form('', '', '', {});
  firstName: string;
  lastName: string;
  enabled = true;
  submitButtonMessage = 'Submit';

  checkinDialogRef: MatDialogRef<CheckinDialogComponent>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private dialog: MatDialog) {
    this.user = this.afAuth.authState; // Update

  }

  ngOnInit() {
    this.videoPlayer.nativeElement.play();
  }

  onCheckin() {
    this.checkinDialogRef = this.dialog.open(CheckinDialogComponent, {
      panelClass: 'no-padding-dialog',
      height: '400px',
      width: '600px'
    });
  }

  invalid(): boolean {
    return !this.enabled || this.lastName === '' || this.firstName === '' || this.form.email === '' || this.form.phone === '';
  }

  getSideWidth() {
    return .3225728 * this.snugColumn.nativeElement.offsetWidth;
  }

  getMiddleWidth() {
    return .3548544 * this.snugColumn.nativeElement.offsetWidth;
  }

  onSubmit() {
    this.form.name = this.lastName + ', ' + this.firstName;
    const updates = {};
    for (const item in JSON.parse(JSON.stringify(this.form))) {
      if (this.form[item] !== '') {
        updates['/forms/' + item + '/' + this.form.phone] = this.form[item];
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
    this.submitButtonMessage = 'Successfully submitted!';
  }
}
