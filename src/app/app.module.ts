import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

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

import { MatDialogModule } from '@angular/material/dialog';

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

let routes: Routes = [];

if (environment.mode = 'normal') {
  routes = [
    { path: '', component: HomeComponent },
    { path: 'membership', component: MembershipComponent },
    { path: 'alumni', component: AlumniComponent },
    { path: 'scholarship', component: ScholarshipComponent },
    { path: 'philanthropy', component: PhilanthropyComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'rush', component: RecruitmentComponent }
  ];
} else if (environment.mode === 'rush') {
  routes = [
    { path: '', component: RecruitmentComponent },
    { path: 'membership', component: MembershipComponent },
    { path: 'alumni', component: AlumniComponent },
    { path: 'scholarship', component: ScholarshipComponent },
    { path: 'philanthropy', component: PhilanthropyComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'about', component: HomeComponent }
  ];
} else if (environment.mode === 'philanthropy') {
  routes = [
    { path: '', component: PhilanthropyComponent },
    { path: 'membership', component: MembershipComponent },
    { path: 'alumni', component: AlumniComponent },
    { path: 'scholarship', component: ScholarshipComponent },
    { path: 'rush', component: RecruitmentComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'about', component: HomeComponent }
  ];
}

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: "https://api-us-west-2.graphcms.com/v2/ckfd7j9ho07w801yyfqop311b/master"
          })
        }
      },
      deps: [HttpLink]
    }],
  entryComponents: [CheckinDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
