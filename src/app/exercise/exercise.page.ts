import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';
import { Location } from '@angular/common';
import { ModifyExerciseComponent } from '../modals/modify-exercise/modify-exercise.component';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  
  public exercise$: Observable<Exercise>;
  public user;
  public currentRoutine : string;

  public countdownNumberEl;
  public countdownAnimNum;
  public countdown = 5;


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
    this.countdownNumberEl = document.getElementById('countdown-number');
    this.countdownNumberEl.textContent = this.countdown.toString();
    this.countdownAnimNum = document.documentElement.style.setProperty('--animation-duration', this.countdown.toString());
    this.currentRoutine = this.router.url.toString().substring(9,29);

    setInterval( () => {this.myfuntion();}, 1000);
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

  myfuntion() {
    console.log("countdown is at " + this.countdownNumberEl);
    this.countdown = --this.countdown <= 0 ? 10 : this.countdown;
    this.countdownNumberEl.textContent = this.countdown.toString();
  }


  
}
