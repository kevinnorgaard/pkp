import {
  Component,
  ElementRef,
  OnInit,
  inject,
  viewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Form } from './form.model';
import { CheckinDialogComponent } from '../../dialogs/checkin-dialog/checkin-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css'],
})
export class RecruitmentComponent extends PageComponent implements OnInit {
  snugColumn = viewChild<ElementRef>('snugCol');
  videoSource = 'assets/flag2.mp4';

  private afAuth = inject(AngularFireAuth);
  private dialog = inject(MatDialog);

  user: Observable<firebase.User | null>;
  form: Form;
  enabled = true;
  signWaiver = false;
  submitButtonMessage = 'Submit';

  checkinDialogRef: MatDialogRef<CheckinDialogComponent>;

  constructor() {
    super();
    this.user = this.afAuth.authState;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onCheckin(): void {
    this.checkinDialogRef = this.dialog.open(CheckinDialogComponent, {
      panelClass: 'no-padding-dialog',
      height: '400px',
      width: '600px',
    });
  }

  onSignWaiver(): void {
    this.signWaiver = !this.signWaiver;
  }

  getSideWidth(): number {
    const col = this.snugColumn();
    return col ? 0.3225728 * col.nativeElement.offsetWidth : 0;
  }

  getMiddleWidth(): number {
    const col = this.snugColumn();
    return col ? 0.3548544 * col.nativeElement.offsetWidth : 0;
  }
}
