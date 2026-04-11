import { Component } from '@angular/core';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private coursesService: CoursesService) {}

  get enrolledCount(): number {
    return this.coursesService.getEnrolledCourses().length;
  }
}