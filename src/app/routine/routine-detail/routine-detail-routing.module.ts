import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutineDetailComponent } from './routine-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RoutineDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutineDetailRoutingModule { }
