import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { EnrollmentDashboardComponent } from './components/enrollment-dashboard/enrollment-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CoursesListComponent,
    CourseCardComponent,
    EnrollmentDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule             
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }