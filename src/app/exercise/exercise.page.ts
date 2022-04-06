import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';
import { Location } from '@angular/common';
import { ModifyExerciseComponent } from '../modals/modify-exercise/modify-exercise.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  
  public exercise$: Observable<Exercise>;
  public user;
  public currentRoutine : string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private modalController: ModalController,
    private location: Location
  ) { }

  async ngOnInit() {
    this.currentRoutine = this.route.snapshot.params.id;
    this.exercise$ = this.exerciseService.getOne(this.currentRoutine, this.route.snapshot.params.exerciseId);
  }

  // increaseSets(){
  //   this.exerciseService.increaseSets(this.currentRoutine, this.route.snapshot.params.id, this.exercise.sets);
  // }

  changeExercise(){
    // const modal = await this.modalController.create({
    //   component: ChangeExerciseComponent,
    //   id:
    // })
  }
  goBack(){
    this.location.back();
  }

  async modifyExercise() {
    const modal = await this.modalController.create({
      component: ModifyExerciseComponent,
      componentProps: {
        routineId: this.currentRoutine,
        exerciseId: this.route.snapshot.params.exerciseId
      }
    });
    await modal.present();
  }
}
