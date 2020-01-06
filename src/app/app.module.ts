import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MembershipComponent } from './pages/membership/membership.component';
import { RouterModule, Routes} from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RecruitmentComponent } from './pages/recruitment/recruitment.component';
import { ScholarshipComponent } from './pages/scholarship/scholarship.component';
import { PhilanthropyComponent } from './pages/philanthropy/philanthropy.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatDialogModule } from '@angular/material';

import { FormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CheckinDialogComponent } from './dialogs/checkin-dialog/checkin-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumniComponent } from './pages/alumni/alumni.component';
import { RusheeProfilesComponent } from './pages/admin/rushee-profiles/rushee-profiles.component';
import { AlumniProfilesComponent } from './pages/admin/alumni-profiles/alumni-profiles.component';
import { EventCheckinComponent } from './pages/admin/event-checkin/event-checkin.component';
import { BulletinComponent } from './bulletin/bulletin.component';

const routes: Routes = [
  { path: '', component: RecruitmentComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'alumni', component: AlumniComponent },
  { path: 'scholarship', component: ScholarshipComponent },
  { path: 'philanthropy', component: PhilanthropyComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'about', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MembershipComponent,
    RecruitmentComponent,
    ScholarshipComponent,
    PhilanthropyComponent,
    AdminComponent,
    CheckinDialogComponent,
    AlumniComponent,
    RusheeProfilesComponent,
    AlumniProfilesComponent,
    EventCheckinComponent,
    BulletinComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {useHash: false}),
    NgbCollapseModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatDialogModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  entryComponents: [CheckinDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
