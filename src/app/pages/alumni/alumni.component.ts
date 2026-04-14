import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { PageComponent } from '../page.component';

export class Alumni {
  public constructor(
    public fullName: string,
    public email: string,
  ) {}
}

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css'],
  imports: [FormsModule],
})
export class AlumniComponent extends PageComponent implements OnInit {
  private afAuth = inject(AngularFireAuth);

  user: Observable<firebase.User | null>;
  form: Alumni = new Alumni('', '');
  enabled = true;
  submitButtonMessage = 'Subscribe';

  constructor() {
    super();
    this.user = this.afAuth.authState;
  }

  override ngOnInit(): void {
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
