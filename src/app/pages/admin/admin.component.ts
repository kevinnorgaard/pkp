import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page.component';
import { RusheeProfilesComponent } from './rushee-profiles/rushee-profiles.component';
import { EventCheckinComponent } from './event-checkin/event-checkin.component';
import { AlumniProfilesComponent } from './alumni-profiles/alumni-profiles.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
    RusheeProfilesComponent,
    EventCheckinComponent,
    AlumniProfilesComponent,
  ],
})
export class AdminComponent extends PageComponent implements OnInit {
  currentMode = 'rushee-profiles';

  override ngOnInit(): void {
    super.ngOnInit();
  }

  changeMode(mode: string): void {
    this.currentMode = mode;
  }
}
