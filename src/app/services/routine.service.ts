import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Routine } from '../models/routine';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  routines: Observable<Routine[]> = EMPTY;
  routinesCollection: AngularFirestoreCollection<Routine>;

  constructor(private afs: AngularFirestore) {
    this.routinesCollection = this.afs.collection<Routine>('routines');
   }

  getAll(){
    return this.routines;
  }

  addRoutine(routine: Routine){
    return this.routinesCollection.add(Object.assign({},routine))
  }
}
