import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Form } from './form.model';
import { CheckinDialogComponent } from '../../dialogs/checkin-dialog/checkin-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as firebase from 'firebase/app';
import { ScrollService } from 'src/scroll.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  @ViewChild('snugCol') snugColumn: ElementRef;
  videoSource = 'assets/flag.mp4';

  user: Observable<firebase.User>;
  form: Form;
  enabled = true;
  signWaiver = false;
  submitButtonMessage = 'Submit';

  checkinDialogRef: MatDialogRef<CheckinDialogComponent>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private dialog: MatDialog,
    private scrollService: ScrollService) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  onCheckin() {
    this.checkinDialogRef = this.dialog.open(CheckinDialogComponent, {
      panelClass: 'no-padding-dialog',
      height: '400px',
      width: '600px'
    });
  }

  onSignWaiver() {
    this.signWaiver = !this.signWaiver;
  }

  getSideWidth() {
    return this.snugColumn != null ? .3225728 * this.snugColumn.nativeElement.offsetWidth : 0;
  }

  getMiddleWidth() {
    return this.snugColumn != null ? .3548544 * this.snugColumn.nativeElement.offsetWidth : 0;
  }

  scrollTop() {
    this.scrollService.scrollTop();
  }

  mode() {
    return environment.mode;
  }
}
