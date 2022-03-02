import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutinePageRoutingModule } from './routine-routing.module';
import { CreateRoutineComponent } from '../modals/create-routine/create-routine.component';
import { RoutinePage } from './routine.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RoutinePageRoutingModule
  ],
  declarations: [RoutinePage, CreateRoutineComponent]
})
export class RoutinePageModule { }
