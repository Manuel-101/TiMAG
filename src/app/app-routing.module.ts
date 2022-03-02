import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'routine',
    loadChildren: () => import('./routine/routine.module').then(m => m.RoutinePageModule)
  },
  {
    path: '',
    redirectTo: 'routine',
    pathMatch: 'full'
  },
  {
    path: 'routine-details',
    loadChildren: () => import('./routine/routine-detail/routine-detail.module').then( m => m.RoutineDetailModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
