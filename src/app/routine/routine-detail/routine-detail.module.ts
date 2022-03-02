import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineDetailComponent } from './routine-detail.component';
import { RoutineDetailRoutingModule } from './routine-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateExerciseComponent } from 'src/app/modals/create-exercise/create-exercise.component';


@NgModule({
  declarations: [
    RoutineDetailComponent,
    CreateExerciseComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RoutineDetailRoutingModule
  ]
})
export class RoutineDetailModule { }
