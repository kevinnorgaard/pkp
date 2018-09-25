import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  rushDates = [
    '2018-9-24',
    '2018-9-25',
    '2018-9-26',
    '2018-9-27',
    '2018-9-28',
    '2018-9-29'
  ];
  forms: any;
  checkins: any;
  currentMode = '';
  orderedRushees: any[];
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = this.afAuth.authState; // Update
    this.loadDatabase();
  }

  changeMode(mode: string) {
    this.currentMode = mode;
    this.loadDatabase();
  }

  loadDatabase() {
    return firebase.database().ref('/').once('value').then((snapshot) => {
      this.forms = snapshot.val() ? snapshot.val().forms : null;
      this.checkins = snapshot.val() ? snapshot.val().checkins : null;
      if (this.currentMode === 'event-checkins') {
        this.orderRusheesByCheckins();
      } else if (this.currentMode === 'rushee-profiles') {
        this.orderRusheesByName();
      }
    });
  }

  orderRusheesByName() {
    const rusheeKeys = Object.keys(this.forms.phone);
    const unorderedRushees = [];
    for (const key of rusheeKeys) {
      unorderedRushees.push([key, this.getRusheeName(key)]);
    }
    this.orderedRushees = unorderedRushees.sort((r1, r2) => {
      if (r1[1] > r2[1]) {
        return 1;
      }
      if (r1[1] < r2[1]) {
        return -1;
      }
      return 0;
    });
  }

  orderRusheesByCheckins() {
    const rusheeKeys = Object.keys(this.forms.phone);
    const unorderedRushees = [];
    for (const key of rusheeKeys) {
      unorderedRushees.push([key, this.getRusheeName(key)]);
    }
    this.orderedRushees = unorderedRushees.sort((r1, r2) => {
      let r1_checkins = 0;
      let r2_checkins = 0;
      for (const date of this.rushDates) {
        if (this.checkedIn(r1[0])[date]) {
          r1_checkins = r1_checkins + 1;
        }
      }
      for (const date of this.rushDates) {
        if (this.checkedIn(r2[0])[date]) {
          r2_checkins = r2_checkins + 1;
        }
      }
      if (r1_checkins > r2_checkins) {
        return 1;
      }
      if (r1_checkins < r2_checkins) {
        return -1;
      }
      return 0;
    });
  }

  checkedIn(key: string) {
    if (this.checkins) {
      return this.checkins[key] ? this.checkins[key] : false;
    }
    return false;
  }

  getCheckins(key: string) {
    if (this.checkins) {
      return this.checkins[key] ? this.checkins[key] : null;
    }
    return null;
  }

  totalCheckins(key: string) {
    const checkins = this.getCheckins(key);
    let sum = 0;
    for (const checkinKey of Object.keys(checkins)) {
      if (checkins[checkinKey]) {
        sum = sum + 1;
      }
    }
    return sum;
  }

  getRusheeTotal() {
    return Object.keys(this.forms.phone).length;
  }

  getDayTotal(day: number) {
    let sum = 0;
    for (const key of Object.keys(this.checkins)) {
      sum = sum + (this.checkins[key][this.rushDates[day]] ? 1 : 0);
    }
    return sum;
  }

  onCheckin(key: string) {
    const updates = {};
    const currentDate = this.getCurrentDate();
    let newVal;
    if (this.getCheckins(key)) {
      newVal = this.getCheckins(key)[currentDate] != null ? !this.getCheckins(key)[currentDate] : true;
      updates['/checkins/' + key + '/' + currentDate] = newVal;
    } else {
      const newCheckin = {};
      newCheckin[currentDate] = true;
      updates['/checkins/' + key] = newCheckin;
    }
    firebase.database().ref().update(updates, (error) => {
      if (error) {
        // The write failed...
        console.log('Failed to save form to Firebase');
      } else {
        // Data saved successfully!
        console.log('Successfully saved form to Firebase!');
      }
    });
    setTimeout(() => this.loadDatabase(), 0);
  }

  getCurrentDate() {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dateStringList = dateString.split('/');
    return dateStringList[2] + '-' + dateStringList[0] + '-' + dateStringList[1];
  }

  getRusheeName(key: string) {
    return this.forms.name[key];
  }

  getEmailString() {
    let emailString = '';
    let first = true;
    for (const email of Object.values(this.forms.email)) {
      if (first) {
        first = false;
        emailString = email as string;
      } else {
        emailString = emailString + ', ' + email;
      }
    }
    return emailString;
  }
}
