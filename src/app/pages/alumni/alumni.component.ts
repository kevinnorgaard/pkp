import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CheckinDialogComponent} from '../../dialogs/checkin-dialog/checkin-dialog.component';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  checkinDialogRef: MatDialogRef<CheckinDialogComponent>;

  ngOnInit() {
  }

  onCheckin() {
    this.checkinDialogRef = this.dialog.open(CheckinDialogComponent, {
      panelClass: 'no-padding-dialog-alumni',
      height: '400px',
      width: '600px'
    });
  }

}
