import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private location: Location
  ) { }

  ngOnInit() {
  }

  logout(){
    this.afAuth.signOut();
  }

  goBack(){
    this.location.back();
  }

}
