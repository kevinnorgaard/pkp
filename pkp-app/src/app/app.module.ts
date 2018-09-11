import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './app/header/header.component';
import { FooterComponent } from './app/footer/footer.component';
import { HomeComponent } from './app/pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MembershipComponent } from './app/pages/membership/membership.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RecruitmentComponent } from './app/pages/recruitment/recruitment.component';
import { ScholarshipComponent } from './app/pages/scholarship/scholarship.component';
import { PhilanthropyComponent } from './app/pages/philanthropy/philanthropy.component';
import { AboutComponent } from './app/pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'recruitment', component: RecruitmentComponent },
  { path: 'scholarship', component: ScholarshipComponent },
  { path: 'philanthropy', component: PhilanthropyComponent },
  { path: 'about', component: AboutComponent }
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
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
