import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }

  resetPassword() {
    this.afAuth.sendPasswordResetEmail(this.form.get('email').value)
      .then(value => {
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log('wrong email or password', err.message);
      });
  }
}
