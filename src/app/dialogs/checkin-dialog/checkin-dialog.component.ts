import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Form } from '../../pages/recruitment/form.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { getCurrentDate, getCheckins } from '../../pages/admin/rushee.utils';

@Component({
  selector: 'app-checkin-dialog',
  templateUrl: './checkin-dialog.component.html',
  styleUrls: ['./checkin-dialog.component.css'],
  imports: [FormsModule],
})
export class CheckinDialogComponent {
  private afAuth = inject(AngularFireAuth);
  private db = inject(AngularFireDatabase);
  private dialog = inject(MatDialog);

  user: any;
  checkins: any;
  enabled = true;
  lastName: string;
  firstName: string;
  form: Form = new Form();

  constructor() {
    this.user = this.afAuth.authState;
  }

  invalid(): boolean {
    return (
      this.lastName === '' ||
      this.firstName === '' ||
      this.form.email === '' ||
      this.form.phone === ''
    );
  }

  onSubmit(): void {
    const updates = {};
    updates['/forms/name/' + this.form.phone] =
      this.lastName + ', ' + this.firstName;
    updates['/forms/email/' + this.form.phone] = this.form.email;
    updates['/forms/phone/' + this.form.phone] = this.form.phone;
    const currentDate = getCurrentDate();
    const checkins = getCheckins(this.checkins, this.form.phone);
    let newVal;
    if (checkins) {
      newVal = checkins[currentDate] != null ? !checkins[currentDate] : true;
      updates['/checkins/' + this.form.phone + '/' + currentDate] = newVal;
    } else {
      const newCheckin = {};
      newCheckin[currentDate] = true;
      updates['/checkins/' + this.form.phone] = newCheckin;
    }

    firebase
      .database()
      .ref()
      .update(updates, (error) => {
        if (error) {
          console.log('Failed to save form to Firebase');
        } else {
          console.log('Successfully saved form to Firebase!');
        }
      });

    this.clearFields();
  }

  clearFields(): void {
    this.firstName = '';
    this.lastName = '';
    this.form = new Form();
  }
}
