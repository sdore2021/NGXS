import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as uuid from 'uuid';
import { Course } from './../../model/course.model';
import { AddCourse } from './../../store/course.actions';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
})
export class CreateCourseComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  onSubmit(name: string, description: string) {
    console.log('name :', name, 'description: ', description);

    const course: Course = {
      id: uuid.v4(),
      name: name,
      description: description,
    };
    this.store.dispatch(new AddCourse(course));
  }
}
