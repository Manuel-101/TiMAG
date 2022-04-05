import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage {

  form: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword() {
    this.afAuth.sendPasswordResetEmail(this.form.get('email').value)
      .then(value => {
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        this.errorMessage = 'Wrong email, ' + err.message;
      });
  }
}
