import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { AngularFireModule } from 'angularfire2';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatDialogModule } from '@angular/material';


// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { CheckinDialogComponent } from './dialogs/checkin-dialog/checkin-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlumniComponent } from './pages/alumni/alumni.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyDU58QVVDyqn-448tPmYnC1xfP3l3G5s2c',
  authDomain: 'pkp-website.firebaseapp.com',
  databaseURL: 'https://pkp-website.firebaseio.com',
  projectId: 'pkp-website',
  storageBucket: 'pkp-website.appspot.com',
  messagingSenderId: '863629223084'
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'recruitment', component: RecruitmentComponent },
  { path: 'alumni', component: AlumniComponent },
  { path: 'scholarship', component: ScholarshipComponent },
  { path: 'philanthropy', component: PhilanthropyComponent },
  { path: 'admin', component: AdminComponent }
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
    AlumniComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {useHash: false}),
    NgbCollapseModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatDialogModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  entryComponents: [CheckinDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
