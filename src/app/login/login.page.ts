import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.maxLength(255)]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.loginForm.get('login').value, this.loginForm.get('password').value)
      .then(value => {
        console.log('logged');
        this.router.navigateByUrl('/routine');
      })
      .catch(err => {
        console.log('wrong email or password', err.message);
      });
  }

}
