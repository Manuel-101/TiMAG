import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  
  public exercise$: Observable<Exercise>;
  public user;
  public currentRoutine : string;
  public exercise: Exercise;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.currentRoutine = this.router.url.toString().substring(9,29);
    //this.exercise$ = await this.exerciseService.getOne(this.currentRoutine, this.route.snapshot.params.id);
    //this.exercise$.subscribe(e => this.exercise = e);
    this.exercise = await (await this.exerciseService.getOne(this.currentRoutine, this.route.snapshot.params.id)).data() as Exercise;
    console.log(await (await this.exerciseService.getOne(this.currentRoutine, this.route.snapshot.params.id)).data());
  }

  changeExercise(){
    // const modal = await this.modalController.create({
    //   component: ChangeExerciseComponent,
    //   id:
    // })
  }

}
