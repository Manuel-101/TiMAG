import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutinePageRoutingModule } from './routine-routing.module';
import { CreateRoutineComponent } from '../modals/create-routine/create-routine.component';
import { RoutinePage } from './routine.page';
import { ChangeRightsComponent } from '../modals/change-rights/change-rights.component';
import { AddReaderComponent } from '../modals/add-reader/add-reader.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    RoutinePageRoutingModule,
  ],
  declarations: [RoutinePage, CreateRoutineComponent, ChangeRightsComponent, AddReaderComponent]
})
export class RoutinePageModule { }
