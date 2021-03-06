import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/models/exercise';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent {

  @Input() routineId: string;

  exerciseForm: FormGroup;

  constructor(private fb: FormBuilder, private modalController: ModalController,
    private routineService: RoutineService) {
    this.exerciseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(255)]
    });
  }

  addExercise() {
    this.routineService.addExercise(
      this.routineId, new Exercise(this.exerciseForm.get('name').value, this.exerciseForm.get('description').value, '1', 3));
    this.modalController.dismiss();
  }

}
