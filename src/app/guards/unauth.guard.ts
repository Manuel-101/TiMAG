import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) { }

  async canActivate(): Promise<boolean> {
    const user = await this.auth.currentUser; // todo check if await is necessary + todo add apk in github tag
    if (user) {
      await this.router.navigate(['/routine']);
      return false;
    }
    return true;
  }
}
