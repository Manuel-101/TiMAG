import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutineDetailComponent } from './routine-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RoutineDetailComponent
  },
  {
    path: ':exerciseId',
    loadChildren: () => import('../../exercise/exercise-routing.module').then(m => m.ExercisePageRoutingModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutineDetailRoutingModule { }
