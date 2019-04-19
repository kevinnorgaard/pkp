import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-event-checkin',
  templateUrl: './event-checkin.component.html',
  styleUrls: ['./event-checkin.component.css']
})
export class EventCheckinComponent implements OnInit {
  rushDates = [
    '2019-1-7',
    '2019-1-8',
    '2019-1-9',
    '2019-1-10'
  ];
  forms: any;
  checkins: any;
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
      this.orderRusheesByLastName();
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

  getCheckins(key: string) {
    if (this.checkins) {
      return this.checkins[key] ? this.checkins[key] : null;
    }
    return null;
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

  getLastName(name: string) {
    const index = name.indexOf(',');
    return name.substring(0, index);
  }

  getFirstName(name: string) {
    const index = name.indexOf(',');
    return name.substring(index + 1);
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
}
