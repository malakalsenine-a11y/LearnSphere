import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  allCourses: Course[] = [];
  filteredCourses: Course[] = [];

  selectedCategory: string = 'All';
  searchTerm: string = '';

  categories: string[] = ['All', 'Web Development', 'Data Science', 'Design', 'Cybersecurity'];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.allCourses = this.coursesService.getCourses();
    this.filteredCourses = this.allCourses;
  }

  filterCourses(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    let categoryCourses: Course[];

    if (this.selectedCategory === 'All') {
      categoryCourses = this.allCourses;
    } else {
      categoryCourses = this.coursesService.getCoursesByCategory(this.selectedCategory);
    }

    this.filteredCourses = categoryCourses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm) ||
      course.instructor.toLowerCase().includes(this.searchTerm)
    );
  }

  enrollCourse(course: Course): void {
    this.coursesService.enrollCourse(course);
  }

  get enrolledCount(): number {
    return this.coursesService.getEnrolledCourses().length;
  }
}