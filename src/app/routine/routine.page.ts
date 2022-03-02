import { Component, OnInit } from '@angular/core';
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

  constructor(private routineService: RoutineService,
    private modalController: ModalController) {
    this.routines$ = routineService.getAll();
  }

  ngOnInit(): void {
  }

  // delete(routine: Routine) {
  //   this.routineService.removeRoutine(routine);
  // }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateRoutineComponent
    });
    await modal.present();
    // this.routines = this.routineService.getAll();
  }

}
