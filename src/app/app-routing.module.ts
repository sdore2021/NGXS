import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsComponent } from './components/animals/animals.component';
import { CounterComponent } from './components/counter/counter.component';

const routes: Routes = [
  { path: 'counter', component: CounterComponent },
  { path: 'animals', component: AnimalsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
