import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.maxLength(255), Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  register() {
    this.afAuth.createUserWithEmailAndPassword(this.registerForm.get('email').value, this.registerForm.get('password').value)
      .then(value => {
        this.SendVerificationMail();
      })
      .catch(err => {
        console.log('something wrong happened, sorry!', err.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
