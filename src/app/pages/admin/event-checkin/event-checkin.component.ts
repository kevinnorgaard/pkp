import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import {
  getFirstName,
  getLastName,
  getCurrentDate,
  getCheckins,
  sortRushees,
} from '../rushee.utils';
import { InterestForm } from '../interest-form.model';

@Component({
  selector: 'app-event-checkin',
  templateUrl: './event-checkin.component.html',
  styleUrls: ['./event-checkin.component.css'],
})
export class EventCheckinComponent {
  private afAuth = inject(AngularFireAuth);
  private db = inject(AngularFireDatabase);

  rushDates = ['2019-9-25', '2019-9-26', '2019-9-27', '2019-9-28'];
  forms: InterestForm;
  checkins: Record<string, Record<string, boolean>>;
  orderedRushees: [string, string][];
  user: Observable<firebase.User | null>;

  orderCheckinsAscending = false;

  getFirstName = getFirstName;
  getLastName = getLastName;

  constructor() {
    this.user = this.afAuth.authState;
    this.loadDatabase();
  }

  loadDatabase(): Promise<void> {
    return firebase
      .database()
      .ref('/')
      .once('value')
      .then((snapshot) => {
        this.forms = snapshot.val()?.forms ?? null;
        this.checkins = snapshot.val()?.checkins ?? null;
        this.orderRusheesByLastName();
      });
  }

  orderRusheesByFirstName(): void {
    this.orderedRushees = sortRushees(this.forms, getFirstName);
  }

  orderRusheesByLastName(): void {
    this.orderedRushees = sortRushees(this.forms, getLastName);
  }

  getCheckins(key: string): Record<string, boolean> | null {
    return getCheckins(this.checkins, key);
  }

  totalCheckins(key: string): number {
    const checkins = this.getCheckins(key);
    if (!checkins) return 0;
    return this.rushDates.filter((date) => checkins[date]).length;
  }

  getRusheeTotal(): number {
    return Object.keys(this.forms.phone).length;
  }

  getDayTotal(day: number): number {
    let sum = 0;
    for (const key of Object.keys(this.checkins)) {
      sum = sum + (this.checkins[key][this.rushDates[day]] ? 1 : 0);
    }
    return sum;
  }

  onCheckin(key: string): void {
    const updates: Record<string, boolean | Record<string, boolean>> = {};
    const currentDate = getCurrentDate();
    let newVal;
    if (this.getCheckins(key)) {
      newVal =
        this.getCheckins(key)[currentDate] != null
          ? !this.getCheckins(key)[currentDate]
          : true;
      updates['/checkins/' + key + '/' + currentDate] = newVal;
    } else {
      const newCheckin: Record<string, boolean> = {};
      newCheckin[currentDate] = true;
      updates['/checkins/' + key] = newCheckin;
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
    setTimeout(() => this.loadDatabase(), 0);
  }

  getRusheeName(key: string): string {
    return this.forms.name[key];
  }

  checkedIn(key: string): Record<string, boolean> {
    return getCheckins(this.checkins, key) ?? {};
  }
}
