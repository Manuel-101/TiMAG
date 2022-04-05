import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
// import * as firebase from 'firebase';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { Routine } from '../models/routine';

import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  routines: Observable<(Routine & { exercises: Exercise[] })[]> = EMPTY;
  routinesCollection: AngularFirestoreCollection<Routine>;

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
  ) { }

  async getAll() {
    if (this.routines === EMPTY) {
      const owner = await this.auth.currentUser;

      this.routinesCollection = this.afs.collection<Routine>('routines', ref => ref.where('owner', '==', owner.uid));
      const routinesOwner = this.routinesCollection.valueChanges({ idField: 'id' });
      const routinesWriter = this.afs.collection<Routine>('routines', ref => ref.where('writers', 'array-contains', owner.email))
      .valueChanges({ idField: 'id' });
      const routinesReader = this.afs.collection<Routine>('routines', ref => ref.where('readers', 'array-contains', owner.email))
      .valueChanges({ idField: 'id' });

      // this.routines = routinesOwner
      this.routines = combineLatest([routinesOwner, routinesWriter, routinesReader]).pipe(
        map(([own, writer, reader]) => own.concat(writer).concat(reader))
      );

      // .pipe(
      //   map((routines: Routine[]) =>
      //     routines.map((routine: Routine) => {
      //       return this.afs
      //         .collection(`routines/${routine.id}/exercises`).valueChanges({ idField: 'id' }).pipe(
      //           map(exercises =>
      //             Object.assign(routine, { exercises: exercises })
      //           )
      //         );
      //     })
      //   ),
      //   flatMap(combined => combineLatest(combined))
      // );
      this.routines.subscribe(console.log);
    }
    return this.routines;
  }

  async deleteOne(id: string): Promise<void> {
    await this.afs.doc(`routines/${id}`).delete();
  }

  getOne(id: string): Observable<Routine> {
    return this.afs.doc<Routine>(`routines/${id}`).valueChanges({ idField: 'id' })
      .pipe(
        switchMap((routine: Routine) => this.afs.collection(`routines/${routine.id}/exercises`).valueChanges({ idField: 'id' }).pipe(
          map(exercises =>
            Object.assign(routine, { exercises })
          )
        )),
      );
  }



  async addRoutine(routineName: string) {
    const routine = new Routine(routineName, (await this.auth.currentUser).uid);
    return await this.routinesCollection.add(Object.assign({}, routine));
  }

  async addExercise(routineId: string, exercise: Exercise) {
    await this.afs.collection<Exercise>(`routines/${routineId}/exercises`).add(Object.assign({}, exercise));
  }


  async addReader(routineId: string, reader: string) {
    await this.afs.doc(`routines/${routineId}`).update({
      readers: firebase.firestore.FieldValue.arrayUnion(reader)
    });
  }

  async addWriter(routineId: string, writer: string) {
    await this.afs.doc(`routines/${routineId}`).update({
      writers: firebase.firestore.FieldValue.arrayUnion(writer)
    });
  }

  async removeRights(routineId: string, member: string) {
    await this.afs.doc(`routines/${routineId}`).update({
      readers: firebase.firestore.FieldValue.arrayRemove(member),
      writers: firebase.firestore.FieldValue.arrayRemove(member),
    });
  }

  // getAll() {
  //   return this.playlists;
  // }

  // getOne(id: number) {
  //   console.log(this.playlists, id)
  //   return this.playlists.find(p => p.id === id);
  // }

  // addPlaylist(playlist: Playlist) {
  //   this.playlists = this.playlists.concat(playlist);
  // }

  // removePlaylist(playlist: Playlist) {
  //   this.playlists = this.playlists.filter(p => p.id !== playlist.id);
  // }

  // addTodo(playlistId: number, todo: Todo) {
  //   const playlistIndex = this.playlists.findIndex(p => p.id === playlistId);
  //   if (this.playlists[playlistIndex]) {
  //     this.playlists[playlistIndex].todos = this.playlists[playlistIndex].todos.concat(todo);
  //   }
  // }

  // removeTodo(playlistId: number, todo: Todo) {
  //   const playlistIndex = this.playlists.findIndex(p => p.id === playlistId);
  //   if (this.playlists[playlistIndex]) {
  //     this.playlists[playlistIndex].todos = this.playlists[playlistIndex].todos.filter(t => t.id !== todo.id);
  //   }
  // }
}
