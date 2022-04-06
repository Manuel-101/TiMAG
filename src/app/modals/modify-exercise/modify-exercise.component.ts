import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-modify-exercise',
  templateUrl: './modify-exercise.component.html',
  styleUrls: ['./modify-exercise.component.scss'],
})
export class ModifyExerciseComponent {

  @Input() routineId: string;
  @Input() exerciseId: string;

  abc: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private exerciseService: ExerciseService) { 
      this.abc = this.fb.group({
        sets: [''],
        time: ['']
      });
    }

  modifyExercise(){
    this.exerciseService.increaseSets(this.routineId, this.exerciseId, this.abc.get('sets').value, this.abc.get('time').value);
    this.modalController.dismiss();
  }

  dismiss(){
    this.modalController.dismiss();
  }


}
