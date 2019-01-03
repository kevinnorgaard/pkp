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
}
