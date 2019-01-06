import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-rushee-profiles',
  templateUrl: './rushee-profiles.component.html',
  styleUrls: ['./rushee-profiles.component.css']
})
export class RusheeProfilesComponent implements OnInit {

  rushDates = [
    '2019-1-7',
    '2019-1-8',
    '2019-1-9',
    '2019-1-10'
  ];
  forms: any;
  checkins: any;
  currentMode = '';
  orderedRushees: any[];
  user: Observable<firebase.User>;
  orderCheckinsAscending = false;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = this.afAuth.authState; // Update
    this.loadDatabase();
  }

  ngOnInit() {
  }

  loadDatabase() {
    return firebase.database().ref('/').once('value').then((snapshot) => {
      this.forms = snapshot.val() ? snapshot.val().forms : null;
      this.checkins = snapshot.val() ? snapshot.val().checkins : null;
      this.orderRusheesByFirstName();
    });
  }

  orderRusheesByFirstName() {
    const rusheeKeys = Object.keys(this.forms.phone);
    const unorderedRushees = [];
    for (const key of rusheeKeys) {
      unorderedRushees.push([key, this.getRusheeName(key)]);
    }
    this.orderedRushees = unorderedRushees.sort((r1, r2) => {
      if (this.getFirstName(r1[1]).toUpperCase() > this.getFirstName(r2[1]).toUpperCase()) {
        return 1;
      }
      if (this.getFirstName(r1[1]).toUpperCase() < this.getFirstName(r2[1]).toUpperCase()) {
        return -1;
      }
      return 0;
    });
  }

  orderRusheesByLastName() {
    const rusheeKeys = Object.keys(this.forms.phone);
    const unorderedRushees = [];
    for (const key of rusheeKeys) {
      unorderedRushees.push([key, this.getRusheeName(key)]);
    }
    this.orderedRushees = unorderedRushees.sort((r1, r2) => {
      if (this.getLastName(r1[1]).toUpperCase() > this.getLastName(r2[1]).toUpperCase()) {
        return 1;
      }
      if (this.getLastName(r1[1]).toUpperCase() < this.getLastName(r2[1]).toUpperCase()) {
        return -1;
      }
      return 0;
    });
  }

  toggleCheckinOrder() {
    this.orderRusheesByCheckins(this.orderCheckinsAscending);
    this.orderCheckinsAscending = !this.orderCheckinsAscending;
  }

  orderRusheesByCheckins(ascending: boolean) {
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
        return ascending ? 1 : -1;
      }
      if (r1_checkins < r2_checkins) {
        return ascending ? -1 : 1;
      }
      return 0;
    });
  }

  getRusheeName(key: string) {
    return this.forms.name[key];
  }

  checkedIn(key: string) {
    if (this.checkins) {
      return this.checkins[key] ? this.checkins[key] : false;
    }
    return false;
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

  getLastName(name: string) {
    const index = name.indexOf(',');
    return name.substring(0, index);
  }

  getFirstName(name: string) {
    const index = name.indexOf(',');
    return name.substring(index + 1);
  }

  getRusheeTotal() {
    return Object.keys(this.forms.phone).length;
  }

  totalCheckins(key: string) {
    const checkins = this.getCheckins(key);
    let sum = 0;
    if (checkins) {
      for (const checkinKey of Object.keys(checkins)) {
        sum = sum + (checkins[checkinKey] ? 1 : 0);
      }
    }
    return sum;
  }

  getCheckins(key: string) {
    if (this.checkins) {
      return this.checkins[key] ? this.checkins[key] : null;
    }
    return null;
  }
}
