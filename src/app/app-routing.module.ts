import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'routine',
    loadChildren: () => import('./routine/routine.module').then(m => m.RoutinePageModule),
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'routine-details',
    loadChildren: () => import('./routine/routine-detail/routine-detail.module').then( m => m.RoutineDetailModule),
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
