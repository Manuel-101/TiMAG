import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Routine } from 'src/app/models/routine';
import { RoutineService } from 'src/app/services/routine.service';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.scss'],
})
export class CreateRoutineComponent implements OnInit {

  routineForm: FormGroup

  constructor(private fb: FormBuilder, private routineService: RoutineService,
    private modalController: ModalController) {
    this.routineForm = this.fb.group({ name: ['', [Validators.required, Validators.minLength(3)]] });
  }

  ngOnInit() { }

  addRoutine() {
    this.routineService.addRoutine(new Routine(this.routineForm.get('name').value));
    this.modalController.dismiss();
  }

}
