import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Output() enroll = new EventEmitter<Course>();

  constructor(private coursesService: CoursesService) {}

  onEnroll() {
    this.enroll.emit(this.course);
  }

  getStars(rating: number): string[] {
    return Array(Math.round(rating)).fill('★');
  }

  isEnrolled(): boolean {
    return this.coursesService.getEnrolledCourses().some(c => c.id === this.course.id);
  }
}

// هنا حققنا:
// 1- @Input() course: Course.
// 2- @Output() enroll = new EventEmitter()
