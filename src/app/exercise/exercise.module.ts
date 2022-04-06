import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisePageRoutingModule } from './exercise-routing.module';

import { ExercisePage } from './exercise.page';
import { ModifyExerciseComponent } from '../modals/modify-exercise/modify-exercise.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ExercisePageRoutingModule
  ],
  declarations: [ExercisePage,
    ModifyExerciseComponent]
})
export class ExercisePageModule {}
