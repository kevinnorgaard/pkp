import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Donation } from './donation.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.css']
})
export class BulletinComponent implements OnInit {
  goal = 10000;
  total = 5260;
  viewMode = 'individuals';
  user: Observable<firebase.User>;
  donation: Donation = new Donation();
  donationSubmitted = false;

  firstName: string;
  lastName: string;

  email: string;
  emailSubmitted = false;

  individuals: Donation[] = [
    {name: 'Kevin Norgaarddddddd', email: 'norgaark@uci.edu', affiliation: 'Alpha Phi', amount: 1000, comment: 'For a week during spring break, thirteen Brothers from all around the nation flew to Colorado to explore the complexity of poverty in Denver. The men cleared out a weeks worth of inventory for and Food Bank of the Rockies, visited an affordable housing apartment complex to paint the walls white, and pack lunches with positive notes for the homeless.'},
    {name: 'Kevin Norgaard', email: 'norgaark@uci.edu', amount: 1000, comment: 'For a week during spring break, thirteen Brothers from all around the nation flew to Colorado to explore the complexity of poverty in Denver. The men cleared out a weeks worth of inventory for and Food Bank of the Rockies, visited an affordable housing apartment complex to paint the walls white, and pack lunches with positive notes for the homeless.'},
    {name: 'Kevin Norgaard', email: 'norgaark@uci.edu', affiliation: 'Alpha Phi', amount: 1000, comment: 'For a week during spring break, thirteen Brothers from all around the nation flew to Colorado to explore the complexity of poverty in Denver. The men cleared out a weeks worth of inventory for and Food Bank of the Rockies, visited an affordable housing apartment complex to paint the walls white, and pack lunches with positive notes for the homeless.'},
    {name: 'Kevin Norgaard', email: 'norgaark@uci.edu', amount: 1000, comment: 'For a week during spring break, thirteen Brothers from all around the nation flew to Colorado to explore the complexity of poverty in Denver. The men cleared out a weeks worth of inventory for and Food Bank of the Rockies, visited an affordable housing apartment complex to paint the walls white, and pack lunches with positive notes for the homeless.'},
    {name: 'Kevin Norgaard', email: 'norgaark@uci.edu', affiliation: 'Alpha Phi', amount: 1000, comment: 'For a week during spring break, thirteen Brothers from all around the nation flew to Colorado to explore the complexity of poverty in Denver. The men cleared out a weeks worth of inventory for and Food Bank of the Rockies, visited an affordable housing apartment complex to paint the walls white, and pack lunches with positive notes for the homeless.'},
    {name: 'Kevin Norgaard', email: 'norgaark@uci.edu', amount: 1000, comment: 'For a week during spring break, thirteen Brothers from all around the nation flew to Colorado to explore the complexity of poverty in Denver. The men cleared out a weeks worth of inventory for and Food Bank of the Rockies, visited an affordable housing apartment complex to paint the walls white, and pack lunches with positive notes for the homeless.'},
  ];

  organizations = [
    {name: 'Pi Phi', amount: 2000},
    {name: 'AXO', amount: 8000},
    {name: 'Alpha Phi', amount: 15000},
    {name: 'Tri Delta', amount: 10000},
    {name: 'Phi Kappa Psi', amount: 150000},
    {name: 'Sigma Kappa', amount: 100},
    {name: 'Theta', amount: 9000},
    {name: 'Delta Gamma', amount: 12000}
  ];

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    this.organizations.sort((a, b) => (a.amount < b.amount) ? 1 : -1);
  }

  selectViewMode(mode: string) {
    this.viewMode = mode;
  }

  getTime() {
    const date = new Date();
    return date.toLocaleDateString();
  }

  invalid(): boolean {
    return this.lastName === '' || this.firstName === '' || this.donation.email === '' || this.donation.amount <= 0;
  }

  onSubmitEmail() {
    this.emailSubmitted = true;
  }

  paypal() {
    let form = document.createElement('paypal-btn');
    form.action = 'https://www.paypal.com/cgi-bin/webscr';
    form.method = 'POST';
    form.innerHTML = '<input name="q" value="test">';
    // the form must be in the document to submit it
    document.body.append(form);
    form.submit();
  }

  onDonate() {
    // this.donation.name = this.lastName + ', ' + this.firstName;
    // const updates = {};
    // for (const item in JSON.parse(JSON.stringify(this.donation))) {
    //   if (this.donation[item] !== '') {
    //     updates['/donations/' + item + '/' + this.donation.email] = this.donation[item];
    //   }
    // }
    // firebase.database().ref().update(updates, function(error) {
    //   if (error) {
    //     // The write failed...
    //     console.log('Failed to save form to Firebase');
    //   } else {
    //     // Data saved successfully!
    //     console.log('Successfully saved form to Firebase!');
    //   }
    // });
    this.donationSubmitted = true;
  }
}
