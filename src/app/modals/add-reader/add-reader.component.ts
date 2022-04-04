import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RoutineService } from 'src/app/services/routine.service';
import { ChangeRightsComponent } from '../change-rights/change-rights.component';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.scss'],
})
export class AddReaderComponent implements OnInit {

  @Input() routineId: string;

  addReaderForm: FormGroup;

  constructor(private fb: FormBuilder,
    private modalController: ModalController,
    private routineService: RoutineService) {
    this.addReaderForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {    
  }

  async addReader() {
    this.routineService.addReader(this.routineId, this.addReaderForm.get('email').value);
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ChangeRightsComponent,
      id: 'changeRights',
      componentProps: {
        routineId: this.routineId,
      }
    });
    await modal.present();
  }
}
