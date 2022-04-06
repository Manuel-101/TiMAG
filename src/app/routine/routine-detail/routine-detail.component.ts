import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CreateExerciseComponent } from 'src/app/modals/create-exercise/create-exercise.component';
import { Routine } from 'src/app/models/routine';
import { Exercise } from 'src/app/models/exercise';
import { RoutineService } from 'src/app/services/routine.service';
import { ChangeRightsComponent } from 'src/app/modals/change-rights/change-rights.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.component.html',
  styleUrls: ['./routine-detail.component.scss']
})
export class RoutineDetailComponent implements OnInit {

  public routine$: Observable<Routine>;
  public routine: Routine;
  public user;

  constructor(private route: ActivatedRoute,
    private routineService: RoutineService,
    private modalController: ModalController,
    private router: Router,
    private auth: AngularFireAuth,
    private location: Location) { }

  async ngOnInit(): Promise<void> {
    this.routine$ = await this.routineService.getOne(this.route.snapshot.params.id);
    this.user = await this.auth.currentUser;
    this.routine$.subscribe(r => this.routine = r)
    //console.log("here : " + this.routine.exercises.toString());
  }

  delete(exercise: Exercise) {
    // todo
    // this.routineService.removeExercise(this.routine.id, exercise);
    // this.routine = this.routineService.getOne(+this.route.snapshot.params.id);
  }

  async addExercise() {
    const modal = await this.modalController.create({
      component: CreateExerciseComponent,
      componentProps: {
        routineId: this.route.snapshot.params.id
      }
    });
    await modal.present();
  }

  async deleteRoutine() {
    await this.routineService.deleteOne(this.route.snapshot.params.id);
    await this.router.navigate(['/routine']);
  }

  async changeRights() {
    const modal = await this.modalController.create({
      component: ChangeRightsComponent,
      id: 'changeRights',
      componentProps: {
        routineId: this.route.snapshot.params.id
      }
    });
    await modal.present();
  }

  isOwner() {
    return this.routine && this.routine.owner === this.user.uid;
  }

  canWrite() {
    return this.routine && (this.isOwner() || this.routine.writers.indexOf(this.user.email) > -1);
  }

  goBack() {
    this.location.back();
  }
}
