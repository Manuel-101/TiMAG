import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutinePage } from './routine.page';

const routes: Routes = [
  {
    path: '',
    component: RoutinePage,
  },
  {
    path: ':id',
    loadChildren: () => import('./routine-detail/routine-detail.module').then(m => m.RoutineDetailModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutinePageRoutingModule { }
