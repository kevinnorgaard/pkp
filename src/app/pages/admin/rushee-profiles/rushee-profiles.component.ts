import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

export class Forms {
  name: any;
  email: any;
  phone: any;
  year: any;
  socialMedia?: any;
  sports?: any;
  cumGpa?: any;
  prevGpa?: any;
  major?: any;
  minor?: any;
  achievements?: any;
  reasons?: any;
  referral?: any;
  notes?: any;
}

@Component({
  selector: 'app-rushee-profiles',
  templateUrl: './rushee-profiles.component.html',
  styleUrls: ['./rushee-profiles.component.css']
})
export class RusheeProfilesComponent {
  removeBitmap = {};
  rushDates = [
    '2019-1-7',
    '2019-1-8',
    '2019-1-9',
    '2019-1-10'
  ];
  forms: Forms;
  checkins: any;
  currentMode = '';
  orderedRushees: any[];
  user: Observable<firebase.User>;
  orderCheckinsAscending = false;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = this.afAuth.authState; // Update
    this.loadDatabase();
  }

  loadDatabase() {
    return firebase.database().ref('/').once('value').then((snapshot) => {
      this.forms = snapshot.val() ? snapshot.val().forms : null;
      this.checkins = snapshot.val() ? snapshot.val().checkins : null;
      this.orderRusheesByFirstName();
      if (this.forms.notes == null) {
        this.forms.notes = {};
      }
      this.resetBitmap();
    });
  }

  resetBitmap() {
    this.removeBitmap = {};
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
    if (name != null) {
      const index = name.indexOf(',');
      return name.substring(0, index);
    }
    return '';
  }

  getFirstName(name: string) {
    if (name != null) {
      const index = name.indexOf(',');
      return name.substring(index + 1);
    }
    return '';
  }

  getRusheeTotal() {
    return Object.keys(this.forms.phone).length;
  }

  totalCheckins(key: string) {
    const checkins = this.getCheckins(key);
    let sum = 0;
    if (checkins) {
      for (const checkinKey of Object.keys(checkins)) {
        sum = sum + (checkins[checkinKey] && this.rushDates.indexOf(checkinKey) !== -1 ? 1 : 0);
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

  onSaveNote(key: string, note: any) {
    const updates = {};
    updates['/forms/notes/' + key] = note;
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

  onRemoveRushee(rushee: any) {
    if (this.removeBitmap[rushee[0]] == null) {
      this.removeBitmap[rushee[0]] = 1;
      return;
    }
    const updates = {};
    updates['/forms/phone/' + rushee[0]] = null;
    updates['/forms/name/' + rushee[0]] = null;
    updates['/forms/email/' + rushee[0]] = null;
    updates['/forms/year/' + rushee[0]] = null;
    updates['/forms/socialMedia/' + rushee[0]] = null;
    updates['/forms/sports/' + rushee[0]] = null;
    updates['/forms/cumGpa/' + rushee[0]] = null;
    updates['/forms/prevGpa/' + rushee[0]] = null;
    updates['/forms/major/' + rushee[0]] = null;
    updates['/forms/minor/' + rushee[0]] = null;
    updates['/forms/achievements/' + rushee[0]] = null;
    updates['/forms/reasons/' + rushee[0]] = null;
    updates['/forms/referral/' + rushee[0]] = null;
    updates['/forms/notes/' + rushee[0]] = null;
    firebase.database().ref().update(updates, (error) => {
      if (error) {
        // The write failed...
        console.log('Failed to save form to Firebase');
      } else {
        // Data saved successfully!
        console.log('Successfully saved form to Firebase!');
      }
    });
    this.resetBitmap();
    setTimeout(() => this.loadDatabase(), 0);
  }
}
