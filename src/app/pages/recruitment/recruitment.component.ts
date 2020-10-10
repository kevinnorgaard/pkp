import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Form } from './form.model';
import { CheckinDialogComponent } from '../../dialogs/checkin-dialog/checkin-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as firebase from 'firebase/app';
import { ScrollService } from '../../scroll.service';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css'],
})
export class RecruitmentComponent
  extends PageComponent
  implements OnInit {
  @ViewChild('snugCol') snugColumn: ElementRef;
  videoSource = 'assets/flag.mp4';

  user: Observable<firebase.User>;
  form: Form;
  enabled = true;
  signWaiver = false;
  submitButtonMessage = 'Submit';

  checkinDialogRef: MatDialogRef<CheckinDialogComponent>;

  constructor(
    scrollService: ScrollService,
    public afAuth: AngularFireAuth,
    private dialog: MatDialog,
  ) {
    super(scrollService);
    this.user = this.afAuth.authState;
  }

  ngOnInit(): void {
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
    return this.snugColumn != null
      ? 0.3225728 * this.snugColumn.nativeElement.offsetWidth
      : 0;
  }

  getMiddleWidth(): number {
    return this.snugColumn != null
      ? 0.3548544 * this.snugColumn.nativeElement.offsetWidth
      : 0;
  }
}
