import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Routine } from 'src/app/models/routine';
import { RoutineService } from 'src/app/services/routine.service';
import { AddReaderComponent } from '../add-reader/add-reader.component';

@Component({
  selector: 'app-change-rights',
  templateUrl: './change-rights.component.html',
  styleUrls: ['./change-rights.component.scss'],
})
export class ChangeRightsComponent implements OnInit {

  @Input() routineId: string;
  public routine$: Observable<Routine>;

  constructor(
    private routineService: RoutineService,
    private modalController: ModalController,
  ) { }

  async ngOnInit() {
    this.routine$ = await this.routineService.getOne(this.routineId);
  }

  async addReader() {
    await this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: AddReaderComponent,
      id: 'addReader',
      componentProps: {
        routineId: this.routineId,
      }
    });
    await modal.present();
  }

  remove(member) {
    this.routineService.removeRights(this.routineId, member);
  }

  changeRights(event, member) {
    const type = event.target.value;
    this.routineService.removeRights(this.routineId, member);
    if (type === 'writer') {
      this.routineService.addWriter(this.routineId, member);
    } else {
      this.routineService.addReader(this.routineId, member);
    }
  }
}
