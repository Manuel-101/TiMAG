import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineDetailComponent } from './routine-detail.component';
import { RoutineDetailRoutingModule } from './routine-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateExerciseComponent } from 'src/app/modals/create-exercise/create-exercise.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RoutineDetailComponent,
    CreateExerciseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    ReactiveFormsModule,
    RoutineDetailRoutingModule,
  ]
})
export class RoutineDetailModule { }
