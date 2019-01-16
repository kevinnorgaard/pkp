import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {Form} from '../../pages/recruitment/form.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-checkin-dialog',
  templateUrl: './checkin-dialog.component.html',
  styleUrls: ['./checkin-dialog.component.css']
})
export class CheckinDialogComponent implements OnInit {
  user: Observable<firebase.User>;

  checkins: any;
  enabled = true;
  lastName: string;
  firstName: string;
  form: Form = new Form('', '', '');

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private dialog: MatDialog) {
    this.user = this.afAuth.authState; // Update
  }

  ngOnInit() {
  }

  invalid(): boolean {
    return this.lastName === '' || this.firstName === '' || this.form.email === '' || this.form.phone === '';
  }

  onSubmit() {
    const updates = {};
    updates['/forms/name/' + this.form.phone] = this.lastName + ', ' + this.firstName;
    updates['/forms/email/' + this.form.phone] = this.form.email;
    updates['/forms/phone/' + this.form.phone] = this.form.phone;
    const currentDate = this.getCurrentDate();
    let newVal;
    if (this.getCheckins(this.form.phone)) {
      newVal = this.getCheckins(this.form.phone)[currentDate] != null ? !this.getCheckins(this.form.phone)[currentDate] : true;
      updates['/checkins/' + this.form.phone + '/' + currentDate] = newVal;
    } else {
      const newCheckin = {};
      newCheckin[currentDate] = true;
      updates['/checkins/' + this.form.phone] = newCheckin;
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

    this.clearFields();
  }

  clearFields() {
    this.form = new Form('', '', '');
    this.firstName = '';
    this.lastName = '';
  }

  getCheckins(key: string) {
    if (this.checkins) {
      return this.checkins[key] ? this.checkins[key] : null;
    }
    return null;
  }

  getCurrentDate() {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dateStringList = dateString.split('/');
    return dateStringList[2] + '-' + dateStringList[0] + '-' + dateStringList[1];
  }
}
