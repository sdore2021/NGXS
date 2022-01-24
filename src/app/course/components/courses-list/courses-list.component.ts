import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Course } from './../../model/course.model';
import {
  DeleteCourse,
  GetCourses,
  UpdateCourse,
} from './../../store/course.actions';
import { CourseState } from './../../store/course.state';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit, OnDestroy {
  @Select(CourseState.getCoursesList)
  courses$!: Observable<Course[]>;

  @Select(CourseState.areCoursesLoaded) areCoursesLoaded$!: Observable<boolean>;

  courseToBeUpdated!: Course;

  isUpdateActivated = false;

  areCoursesLoadedSub!: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.areCoursesLoadedSub = this.areCoursesLoaded$
      .pipe(
        tap((areCoursesLoaded) => {
          if (!areCoursesLoaded) {
            this.store.dispatch(new GetCourses());
          }
        })
      )
      .subscribe((value) => {
        console.log(value);
      });
  }

  ngOnDestroy() {
    this.areCoursesLoadedSub.unsubscribe();
  }

  deleteCourse(courseId: string) {
    this.store.dispatch(new DeleteCourse(courseId));
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = { ...course };
    this.isUpdateActivated = true;
  }

  updateCourse(name: string, description: string) {
    this.courseToBeUpdated.name = name;
    this.courseToBeUpdated.description = description;

    this.store.dispatch(
      new UpdateCourse(this.courseToBeUpdated, this.courseToBeUpdated.id)
    );
  }
}
