import { InterestForm } from './../interest-form.model';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import {
  getFirstName,
  getLastName,
  getCheckins,
  sortRushees,
} from '../rushee.utils';

@Component({
  selector: 'app-rushee-profiles',
  templateUrl: './rushee-profiles.component.html',
  styleUrls: ['./rushee-profiles.component.css'],
  imports: [FormsModule],
})
export class RusheeProfilesComponent {
  private afAuth = inject(AngularFireAuth);
  private db = inject(AngularFireDatabase);

  removeBitmap = {};
  rushDates = ['2019-9-25', '2019-9-26', '2019-9-27', '2019-9-28'];
  forms: InterestForm;
  checkins: any;
  orderedRushees: any[];
  user: any;
  orderCheckinsAscending = false;

  getFirstName = getFirstName;
  getLastName = getLastName;

  constructor() {
    this.user = this.afAuth.authState;
    this.loadDatabase();
  }

  loadDatabase(): any {
    return firebase
      .database()
      .ref('/')
      .once('value')
      .then((snapshot) => {
        this.forms = snapshot.val()?.forms ?? null;
        this.checkins = snapshot.val()?.checkins ?? null;
        this.orderRusheesByFirstName();
        if (this.forms.notes == null) {
          this.forms.notes = {};
        }
        this.removeBitmap = {};
      });
  }

  orderRusheesByFirstName(): void {
    this.orderedRushees = sortRushees(this.forms, getFirstName);
  }

  orderRusheesByLastName(): void {
    this.orderedRushees = sortRushees(this.forms, getLastName);
  }

  toggleCheckinOrder(): void {
    this.orderRusheesByCheckins(this.orderCheckinsAscending);
    this.orderCheckinsAscending = !this.orderCheckinsAscending;
  }

  orderRusheesByCheckins(ascending: boolean): void {
    const rushees = sortRushees(this.forms, getFirstName);
    this.orderedRushees = rushees.sort((r1, r2) => {
      const c1 = this.totalCheckins(r1[0]);
      const c2 = this.totalCheckins(r2[0]);
      return ascending ? c1 - c2 : c2 - c1;
    });
  }

  getRusheeName(key: string): string {
    return this.forms.name[key];
  }

  checkedIn(key: string): any {
    return getCheckins(this.checkins, key) || false;
  }

  getEmailString(): string {
    return Object.values(this.forms.email).join(', ');
  }

  getRusheeTotal(): number {
    return Object.keys(this.forms.phone).length;
  }

  totalCheckins(key: string): number {
    const checkins = getCheckins(this.checkins, key);
    if (!checkins) return 0;
    return this.rushDates.filter((date) => checkins[date]).length;
  }

  getCheckins(key: string): any {
    return getCheckins(this.checkins, key);
  }

  onSaveNote(key: string, note: any): void {
    firebase
      .database()
      .ref()
      .update({ ['/forms/notes/' + key]: note });
    setTimeout(() => this.loadDatabase(), 0);
  }

  onRemoveRushee(rushee: any): void {
    if (this.removeBitmap[rushee[0]] == null) {
      this.removeBitmap[rushee[0]] = 1;
      return;
    }
    const updates = {};
    for (const field of [
      'phone',
      'name',
      'email',
      'year',
      'socialMedia',
      'sports',
      'cumGpa',
      'prevGpa',
      'major',
      'minor',
      'achievements',
      'reasons',
      'referral',
      'notes',
    ]) {
      updates[`/forms/${field}/${rushee[0]}`] = null;
    }
    firebase.database().ref().update(updates);
    this.removeBitmap = {};
    setTimeout(() => this.loadDatabase(), 0);
  }

  resetBitmap(): void {
    this.removeBitmap = {};
  }
}
