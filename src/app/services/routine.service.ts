import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { Routine } from '../models/routine';

import { flatMap, map, single, switchMap } from 'rxjs/operators';
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
    // this.routinesCollection = this.afs.collection<Routine>('routines');
    const owner = await this.auth.currentUser;
    console.log(owner);
    
    this.routinesCollection = this.afs.collection<Routine>('routines', ref => ref.where('owner', '==', owner.uid));

    this.routines = this.routinesCollection.valueChanges({ idField: 'id' }).pipe(
      map((routines: Routine[]) =>
        routines.map((routine: Routine) => {
          return this.afs
            .collection(`routines/${routine.id}/exercises`).valueChanges({ idField: 'id' }).pipe(
              map(exercises =>
                Object.assign(routine, { exercises: exercises })
              )
            );
        })
      ),
      flatMap(combined => combineLatest(combined))
    );
    this.routines.subscribe(console.log);
    return this.routines;
  }

  getAldddsl() {
    return this.routines;
    // const owner = await this.auth.currentUser;
    // return this.afs.collection<Routine>('routines', ref => ref.where('owner', '==', owner.uid)).valueChanges({ idfield: 'id' });
    // combineLatest([ownern reader]).pipe()
    // return AngularFirestore.collectionData()

  }

  getOne(id: string): Observable<Routine> {
    return this.afs.doc<Routine>(`routines/${id}`).valueChanges({ idField: 'id' })
      .pipe(
        switchMap((routine: Routine) => {
          return this.afs.collection(`routines/${routine.id}/exercises`).valueChanges({ idField: 'id' }).pipe(
            map(exercises =>
              Object.assign(routine, { exercises: exercises })
            )
          );
        }),
      );
  }

  async addRoutine(routineName: string) {
    const routine = new Routine(routineName, (await this.auth.currentUser).uid);
    return await this.routinesCollection.add(Object.assign({}, routine));
  }

  addExercise(routineId: string, exercise: Exercise) {
    this.afs.collection<Exercise>(`routines/${routineId}/exercises`).add(Object.assign({}, exercise));
    console.log(exercise);
    console.log(routineId);

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
