import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: Course[] = [
    {
      id: 1,
      title: 'HTML & CSS Bootcamp',
      category: 'Web Development',
      instructor: 'Ahmed Ali',
      rating: 4.7,
      price: 49,
      duration: '8h 30m',
      level: 'Beginner',
      studentsCount: 1200,
      available: true,
      topics: ['HTML Basics', 'CSS Fundamentals', 'Responsive Design']
    },
    {
      id: 2,
      title: 'JavaScript Essentials',
      category: 'Web Development',
      instructor: 'Sara Khaled',
      rating: 4.9,
      price: 59,
      duration: '10h 15m',
      level: 'Intermediate',
      studentsCount: 950,
      available: true,
      topics: ['Variables', 'Functions', 'DOM Manipulation']
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      category: 'Design',
      instructor: 'Ali Hassan',
      rating: 4.5,
      price: 39,
      duration: '7h 45m',
      level: 'Beginner',
      studentsCount: 700,
      available: false,
      topics: ['Figma', 'Wireframes', 'User Experience']
    },
    {
      id: 4,
      title: 'Python for Data Science',
      category: 'Data Science',
      instructor: 'Mona Ibrahim',
      rating: 4.8,
      price: 69,
      duration: '12h 20m',
      level: 'Advanced',
      studentsCount: 1100,
      available: true,
      topics: ['Python Basics', 'Pandas', 'Data Analysis']
    },
    {
      id: 5,
      title: 'Cybersecurity Fundamentals',
      category: 'Cybersecurity',
      instructor: 'Omar Saeed',
      rating: 4.3,
      price: 55,
      duration: '9h 10m',
      level: 'Intermediate',
      studentsCount: 500,
      available: false,
      topics: ['Security Basics', 'Threats', 'Network Protection']
    }
  ];

private enrolledCourses: Course[] = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  constructor() { }

  getCourses(): Course[] {
    return this.courses;
  }

getCoursesByCategory(category: string): Course[] {
  if (category === 'All') {
    return this.courses;
  }
  return this.courses.filter(course => course.category === category);
}

  getTopRated(n: number): Course[] {
    return [...this.courses]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, n);
  }

enrollCourse(course: Course): void {
  const exists = this.enrolledCourses.some(c => c.id === course.id);
  if (!exists) {
    this.enrolledCourses.push(course);
    localStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourses));
  }
}

  getEnrolledCourses(): Course[] {
    return this.enrolledCourses;
  }
}