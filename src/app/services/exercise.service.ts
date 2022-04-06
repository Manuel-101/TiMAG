import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Exercise } from '../models/exercise';
import { Routine } from '../models/routine';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exercises: Observable<Exercise[]> = EMPTY;
  exercisesCollection: AngularFirestoreCollection<Exercise>;

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
  ) { }

  getOne(routineId: string, id: string): Observable<Exercise> {
    //return new Exercise("a", "b", "c", 5);
    // return this.afs.doc<Exercise>(`routines/${routineId}/exercises/${id}`).valueChanges({ idField: 'id' })
    // .pipe(
    //   switchMap((exercise: Exercise) => this.afs.collection(`routines/${routineId}/exercises/${exercise.id}`).valueChanges({ idField: 'id' }).pipe(
    //     map(exercises =>
    //       Object.assign(exercise, { exercises })
    //     )
    //   )),
    // ); // todo check if remove switchmap???
    return this.afs.doc<Exercise>(`routines/${routineId}/exercises/${id}`).valueChanges({ idField: 'id' });
  }


  increaseSets(routineId: string, id: string, s: number, t: number) : void {
    this.afs.collection("routines").doc(routineId).collection("exercises").doc(id).update({sets: s});
    this.afs.collection("routines").doc(routineId).collection("exercises").doc(id).update({time: t});

  }
}
