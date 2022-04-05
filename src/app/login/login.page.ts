import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.maxLength(255)]
    });
  }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.loginForm.get('login').value, this.loginForm.get('password').value)
      .then(value => {
        this.router.navigateByUrl('/routine');
      })
      .catch(err => {
        this.errorMessage = 'Wrong email or password, ' + err.message;
      });
  }

}
