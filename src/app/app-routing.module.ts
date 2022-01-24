import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsComponent } from './components/animals/animals.component';
import { CounterComponent } from './components/counter/counter.component';
import { CoursesListComponent } from './course/components/courses-list/courses-list.component';
import { CreateCourseComponent } from './course/components/create-course/create-course.component';

const routes: Routes = [
  { path: 'counter', component: CounterComponent },
  { path: 'animals', component: AnimalsComponent },
  {
    path: 'courses',
    component: CoursesListComponent,
  },
  { path: 'create-course', component: CreateCourseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
