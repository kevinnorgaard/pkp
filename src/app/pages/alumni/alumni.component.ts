import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ScrollService } from 'src/scroll.service';

export class Alumni {
  public constructor(
    public fullName: string,
    public email: string
  ) {  }
}

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent {
  user: Observable<firebase.User>;
  form: Alumni = new Alumni('', '');
  enabled = true;
  submitButtonMessage = 'Subscribe';

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private dialog: MatDialog,
    private scrollService: ScrollService) {
    this.user = this.afAuth.authState; // Update
  }

  invalid(): boolean {
    return !this.enabled || this.form.fullName === '' || this.form.email === '';
  }

  onSubmit() {
    if (this.invalid()) {
      console.log('Invalid Form: Failed to save form to Firebase');
      return;
    }
    const updates = {};
    for (const item in JSON.parse(JSON.stringify(this.form))) {
      if (this.form[item] !== '') {
        updates['/alumni/' + item + '/' + this.form.fullName] = this.form[item];
      }
    }
    firebase.database().ref().update(updates, function(error) {
      if (error) {
        // The write failed...
        console.log('Failed to save form to Firebase');
      } else {
        // Data saved successfully!
        console.log('Successfully saved form to Firebase!');
      }
    });
    this.enabled = false;
    this.submitButtonMessage = 'Successfully enrolled!';
  }

  scrollTop() {
    this.scrollService.scrollTop();
  }
}
