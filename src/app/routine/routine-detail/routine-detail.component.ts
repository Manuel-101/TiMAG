import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateExerciseComponent } from 'src/app/modals/create-exercise/create-exercise.component';
import { Routine } from 'src/app/models/routine';
import { Exercise } from 'src/app/models/exercise';
import { RoutineService } from 'src/app/services/routine.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.component.html',
  styleUrls: ['./routine-detail.component.scss']
})
export class RoutineDetailComponent implements OnInit {

  public routine$: Observable<Routine>;

  constructor(private route: ActivatedRoute,
    private routineService: RoutineService,
    private modalController: ModalController,
    private router: Router) { }
    
  async ngOnInit(): Promise<void> {
    this.routine$ = await this.routineService.getOne(this.route.snapshot.params.id);
    console.log(this.routine$);
    this.routine$.subscribe(console.log);

  }

  delete(exercise: Exercise) {
    // todo
    // this.routineService.removeExercise(this.routine.id, exercise);
    // this.routine = this.routineService.getOne(+this.route.snapshot.params.id);
  }

  async openModal() {
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
}
