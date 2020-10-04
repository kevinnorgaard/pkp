import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AdminComponent } from './pages/admin/admin.component';
import { AlumniComponent } from './pages/alumni/alumni.component';
import { HomeComponent } from './pages/home/home.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { PhilanthropyComponent } from './pages/philanthropy/philanthropy.component';
import { RecruitmentComponent } from './pages/recruitment/recruitment.component';
import { ScholarshipComponent } from './pages/scholarship/scholarship.component';

let routes: Routes = [];

if (environment.mode === 'normal') {
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
  imports: [ RouterModule.forRoot(routes, {useHash: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
