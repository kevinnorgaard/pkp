import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { Observable } from 'rxjs';
import { Donation, Donor } from './donation.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.css']
})
export class BulletinComponent implements OnInit {
  goal = 10000;
  total = 0;

  welcomeBack = false;
  viewMode = 'individuals';
  user: Observable<firebase.User>;

  donation: Donation = new Donation();
  donor: Donor = new Donor();

  donationSubmitted = false;
  emailSubmitted = false;
  paypalSubmitted = false;

  donorMap = {};

  donations: Donation[] = [];

  organizationOptions = [
    'Alpha Chi Omega',
    'Alpha Phi',
    'Delta Delta Delta',
    'Delta Gamma',
    'Gamma Phi Beta',
    'Kappa Alpha Theta'
  ];

  organizations = [
    {name: 'Alpha Chi Omega', amount: 0},
    {name: 'Alpha Phi', amount: 0},
    {name: 'Delta Delta Delta', amount: 0},
    {name: 'Delta Gamma', amount: 0},
    {name: 'Gamma Phi Beta', amount: 0},
    {name: 'Kappa Alpha Theta', amount: 0}
  ];

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    this.loadDonorMap();
    this.loadAllDonations();
  }

  resetAll () {
    this.donorMap = {};
    this.total = 0;
    this.donations = [];
    this.organizations = [
      {name: 'Alpha Chi Omega', amount: 0},
      {name: 'Alpha Phi', amount: 0},
      {name: 'Delta Delta Delta', amount: 0},
      {name: 'Delta Gamma', amount: 0},
      {name: 'Gamma Phi Beta', amount: 0},
      {name: 'Kappa Alpha Theta', amount: 0}
    ];
  }

  loadDonorMap() {
    firebase.database().ref('/donor/').once('value').then((snapshot) => {
      let found = false;
      let keys = snapshot.val();
      for (let k in keys) {
        this.donorMap[k] = keys[k].firstName + ' ' + keys[k].lastName;
      }
    });
  }

  loadAllDonations() {
    this.resetAll();
    firebase.database().ref('/donation/').once('value').then((snapshot) => {
      const keys = snapshot.val();
      for (let k in keys) {
        if (keys[k].amount) {
          let amount = keys[k].amount;
          // Add amount to total donations
          this.total += parseInt(amount, 10);
          if (keys[k].affiliation && keys[k].affiliation != 'None') {
            for (let org of this.organizations) {
              if (org.name == keys[k].affiliation) {
                // Add amount to organizations
                org.amount += parseInt(amount, 10);
              }
            }
          }
        }
        // Create a Donation Post object
        const donation: Donation = {
          donation_id: k,
          id: keys[k].id ? keys[k].id : '',
          anonymous: keys[k].anonymous ? keys[k].anonymous : false,
          affiliation: keys[k].affiliation ? keys[k].affiliation : '',
          amount: keys[k].amount ? keys[k].amount : 0,
          comment: keys[k].comment ? keys[k].comment : '',
          time: keys[k].time ? keys[k].time : ''
        };
        this.donations.push(donation);
      }
      this.orderDonationsByDate();
      this.organizations.sort((a, b) => (a.amount < b.amount) ? 1 : -1);
    });
  }

  orderDonationsByDate() {
    this.donations = this.donations.sort((r1, r2) => {
      if (r1.time > r2.time) {
        return -1;
      }
      if (r1.time < r2.time) {
        return 1;
      }
      return 0;
    });
  }

  selectViewMode(mode: string) {
    this.viewMode = mode;
  }

  getTimeStamp() {
    // Test the hour!!!
    const date = new Date();
    const yearString = date.getFullYear().toString();
    const monthString = date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    const dayString = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();
    const hourString = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
    const minuteString = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
    const secondString = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString();
    const timestamp = yearString + '/' + monthString + '/' + dayString + ' ' +
                      hourString + ':' + minuteString + ':' + secondString;
    return timestamp;
  }

  formatTimeStamp(timestamp: string) {
    const index = timestamp.indexOf(' ') + 1;
    const hour = parseInt(timestamp.substr(index, 2), 10);
    return timestamp.substring(5, 10) + '/' + timestamp.substring(2, 4) + ' at ' + timestamp.substr(index, 5);
  }

  invalid(): boolean {
    return this.donor.lastName == null || this.donor.lastName === '' ||
           this.donor.firstName == null || this.donor.firstName === '' ||
           this.donation.amount <= 0;
  }

  initializeDonor(donor: any) {
    if (donor.firstName != null) {
      this.welcomeBack = true;
      this.donor.firstName = donor.firstName;
    }
    this.donor.lastName = donor.lastName ? donor.lastName : '';
  }

  onSubmitEmail() {
    firebase.database().ref('/donor/').once('value').then((snapshot) => {
      let found = false;
      const keys = snapshot.val();
      // Search for existing donor key
      for (let k in keys) {
        if (keys[k].email === this.donor.email) {
          this.donation.id = this.donor.id = k;
          found = true;
          this.initializeDonor(keys[k]);
        }
      }
      if (!found) {
        // Failed --> create new donor key
        let newRef = firebase.database().ref('donor/');
        let dr: DatabaseReference = newRef.push({ email: this.donor.email }, function(error) {
          if (error) {
            console.log('Failed to save form to Firebase');
          } else {
            console.log('Successfully saved form to Firebase!');
          }
        });
        this.donation.id = this.donor.id = dr.key;  // Fix this code
      }
    });
    this.emailSubmitted = true;
  }

  paypal() {
    const form: HTMLFormElement = <HTMLFormElement> document.getElementById('paypal-btn');
    form.action = 'https://www.paypal.com/cgi-bin/webscr';
    form.autocomplete = 'on';
    form.method = 'POST';
    form.target = '_blank';
    form.innerHTML = '<input type="hidden" name="amount" value="' + this.donation.amount.toString() + '"/>'
      + '<input type="hidden" name="cmd" value="_donations"/>'
      + '<input type="hidden" name="business" value="GWQPPHJ7RAWZ8"/>'
      + '<input type="hidden" name="currency_code" value="USD">'
      + '<input type="hidden" name="cbt" value="Cancel and return to Phi Psi donation"/>';
    form.submit();
    this.paypalSubmitted = true;
  }

  onDonate() {
    const donationInfo = {};
    const donorInfo = {};
    let donationRef = firebase.database().ref('donation/');
    let donorRef = firebase.database().ref('donor/' + this.donor.id);
    // re-format Donation object for database
    for (const item in JSON.parse(JSON.stringify(this.donation))) {
      if (this.donation[item] !== '') {
        if (item == 'affiliation' && this.donation[item] === 'None') {
          continue;
        }
        donationInfo[item] = this.donation[item];
      }
    }
    donationInfo['time'] = this.getTimeStamp();
    // re-format Donor object for database
    for (const item in JSON.parse(JSON.stringify(this.donor))) {
      if (this.donor[item] !== '') {
        if (item === 'id') {
          continue;
        }
        donorInfo[item] = this.donor[item];
      }
    }
    // Add new unique Donation to the database
    donationRef.push(donationInfo, function(error) {
      if (error) {
        console.log('Failed to save form to Firebase');
      } else {
        console.log('Successfully saved form to Firebase!');
      }
    });
    // update existing donor in the database
    donorRef.update(donorInfo, function(error) {
      if (error) {
        console.log('Failed to save form to Firebase');
      } else {
        console.log('Successfully saved form to Firebase!');
      }
    });
    this.donationSubmitted = true;
    this.loadDonorMap();
    this.loadAllDonations();
  }

  validEmail() {
    return this.donor.email != null && this.donor.email != '' &&
           this.donor.email.indexOf('@') > -1 && this.donor.email.indexOf('.') > -1;
  }

  validAmount() {
    return /^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/.test(this.donation.amount.toString());
  }

  validDonation() {
    return !this.invalid() && this.paypalSubmitted;
  }
}
