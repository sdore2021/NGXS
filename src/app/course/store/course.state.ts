import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Action,
  Selector,
  State,
  StateContext,
  UpdateState,
} from '@ngxs/store';
import { tap } from 'rxjs';
import { Course } from '../model/course.model';
import { CourseService } from '../services/course.service';
import {
  AddCourse,
  DeleteCourse,
  GetCourses,
  UpdateCourse,
} from './course.actions';

export class CourseStateModel {
  courses!: Course[];
  areCoursesLoaded!: boolean;
}

@State<CourseStateModel>({
  name: 'courses',
  defaults: {
    courses: [],
    areCoursesLoaded: false,
  },
})
@Injectable()
export class CourseState {
  constructor(private courseService: CourseService, private router: Router) {}

  @Selector()
  static getCoursesList(state: CourseStateModel) {
    return state.courses;
  }

  @Selector()
  static areCoursesLoaded(state: CourseStateModel) {
    return state.areCoursesLoaded;
  }

  @Action(GetCourses)
  getCourses(ctx: StateContext<CourseStateModel>) {
    const state = ctx.getState();
    return this.courseService.getAllCourses().pipe(
      tap((result) => {
        ctx.setState({
          ...state,
          courses: result,
          areCoursesLoaded: true,
        });
      })
    );
  }

  @Action(DeleteCourse)
  deleteCourse(
    { getState, setState }: StateContext<CourseStateModel>,
    { id }: DeleteCourse
  ) {
    return this.courseService.deleteCourse(id).pipe(
      tap((result) => {
        const state = getState();
        const filteredArray = state.courses.filter((item) => item.id != id);
        setState({
          ...state,
          courses: filteredArray,
        });
      })
    );
  }

  @Action(UpdateState)
  updateCourse(
    { getState, setState }: StateContext<CourseStateModel>,
    { payload, id }: UpdateCourse
  ) {
    return this.courseService.updateCourse(id, payload).pipe(
      tap((result) => {
        const state = getState();
        const coursesList = [...state.courses];
        const courseIndex = coursesList.findIndex((item) => item.id === id);
        coursesList[courseIndex] = result;

        setState({
          ...state,
          courses: coursesList,
        });
      })
    );
  }

  @Action(AddCourse)
  addCourse(
    { getState, patchState }: StateContext<CourseStateModel>,
    { payload }: AddCourse
  ) {
    return this.courseService.createCourse(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          courses: [...state.courses, result],
        });
        this.router.navigateByUrl('/courses');
      })
    );
  }
}
