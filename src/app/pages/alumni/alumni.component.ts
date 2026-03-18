import { PageComponent } from '../page.component';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ScrollService } from '../../scroll.service';

export class Alumni {
  public constructor(public fullName: string, public email: string) {}
}

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css'],
})
export class AlumniComponent extends PageComponent implements OnInit {
  user: any;
  form: Alumni = new Alumni('', '');
  enabled = true;
  submitButtonMessage = 'Subscribe';

  constructor(scrollService: ScrollService, public afAuth: AngularFireAuth) {
    super(scrollService);
    this.user = this.afAuth.authState;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  invalid(): boolean {
    return !this.enabled || this.form.fullName === '' || this.form.email === '';
  }

  onSubmit(): void {
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
    this.enabled = false;
    this.submitButtonMessage = 'Successfully enrolled!';
  }
}
