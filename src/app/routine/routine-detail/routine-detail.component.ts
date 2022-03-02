import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateExerciseComponent } from 'src/app/modals/create-exercise/create-exercise.component';
import { Routine } from 'src/app/models/routine';
import { Exercise } from 'src/app/models/exercise';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.component.html',
  styleUrls: ['./routine-detail.component.scss']
})
export class RoutineDetailComponent implements OnInit {

  public routine: Routine;

  constructor(private route: ActivatedRoute,
    private routineService: RoutineService,
    private modalController: ModalController) { }
    
  async ngOnInit(): Promise<void> {
    this.routine = await this.routineService.getOne(this.route.snapshot.params.id);
    console.log(this.routine);
    

  }

  delete(exercise: Exercise) {
    // this.routineService.removeExercise(this.routine.id, exercise);
    // this.routine = this.routineService.getOne(+this.route.snapshot.params.id);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateExerciseComponent,
      componentProps: {
        routineId: this.routine.id
      }
    });
    await modal.present();
    // this.routine = this.routineService.getOne(+this.route.snapshot.params.id);
  }

}
