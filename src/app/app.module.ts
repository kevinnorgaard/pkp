import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { MembershipComponent } from './pages/membership/membership.component';
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
import {
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { CheckinDialogComponent } from './dialogs/checkin-dialog/checkin-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumniComponent } from './pages/alumni/alumni.component';
import { RusheeProfilesComponent } from './pages/admin/rushee-profiles/rushee-profiles.component';
import { AlumniProfilesComponent } from './pages/admin/alumni-profiles/alumni-profiles.component';
import { EventCheckinComponent } from './pages/admin/event-checkin/event-checkin.component';
import { BannerComponent } from './banner/banner.component';
import { ScrollButtonComponent } from './scroll-button/scroll-button.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgbCollapseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatDialogModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
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
    BannerComponent,
    ScrollButtonComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri:
              'https://api-us-west-2.graphcms.com/v2/ckfd7j9ho07w801yyfqop311b/master',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  entryComponents: [CheckinDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
