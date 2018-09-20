import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './app/header/header.component';
import { FooterComponent } from './app/footer/footer.component';
import { HomeComponent } from './app/pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MembershipComponent } from './app/pages/membership/membership.component';
import { RouterModule, Routes} from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RecruitmentComponent } from './app/pages/recruitment/recruitment.component';
import { ScholarshipComponent } from './app/pages/scholarship/scholarship.component';
import { PhilanthropyComponent } from './app/pages/philanthropy/philanthropy.component';
import { AboutComponent } from './app/pages/about/about.component';
import { AngularFireModule } from 'angularfire2';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import { AdminComponent } from './app/pages/admin/admin.component';

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
  { path: 'scholarship', component: ScholarshipComponent },
  { path: 'philanthropy', component: PhilanthropyComponent },
  { path: 'about', component: AboutComponent },
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
    AboutComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbCollapseModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
