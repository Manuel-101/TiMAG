import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController } from '@ionic/angular';
import { EMPTY, Observable } from 'rxjs';
import { CreateRoutineComponent } from '../modals/create-routine/create-routine.component';
import { Routine } from '../models/routine';
import { RoutineService } from '../services/routine.service';

@Component({
  selector: 'app-routine',
  templateUrl: 'routine.page.html',
  styleUrls: ['routine.page.scss'],
})
export class RoutinePage implements OnInit {

  routines$: Observable<Routine[]> = EMPTY;
  user;

  constructor(private routineService: RoutineService,
    private modalController: ModalController,
    private auth: AngularFireAuth,
  ) {
  }

  async ngOnInit() {
    this.routines$ = await this.routineService.getAll();
    this.user = await this.auth.currentUser;
  }

  // delete(routine: Routine) { // todo
  //   this.routineService.removeRoutine(routine);
  // }

  async addRoutine() {
    const modal = await this.modalController.create({
      component: CreateRoutineComponent
    });
    await modal.present();
  }


  isOwner(routine: Routine) {
    return routine.owner === this.user.uid;
  }

  isWriter(routine: Routine) {
    return !this.isOwner(routine) && routine.writers.indexOf(this.user.email) > -1;
  }

}
