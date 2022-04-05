import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  {
    path: 'routine',
    loadChildren: () => import('./routine/routine.module').then(m => m.RoutinePageModule),
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'routine-details',
    loadChildren: () => import('./routine/routine-detail/routine-detail.module').then(m => m.RoutineDetailModule),
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./password-recovery/password-recovery.module').then(m => m.PasswordRecoveryPageModule),
    canActivate: [UnauthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
