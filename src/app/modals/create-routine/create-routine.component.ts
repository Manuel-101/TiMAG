import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.scss'],
})
export class CreateRoutineComponent {

  routineForm: FormGroup;

  constructor(private fb: FormBuilder, private routineService: RoutineService,
    private modalController: ModalController) {
    this.routineForm = this.fb.group({ name: ['', [Validators.required, Validators.minLength(3)]] });
  }

  addRoutine() {
    this.routineService.addRoutine(this.routineForm.get('name').value);
    this.modalController.dismiss();
  }

}
