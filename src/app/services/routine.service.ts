import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { Routine } from '../models/routine';

import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  routines: Observable<(Routine & { exercises: Exercise[] })[]> = EMPTY;
  routinesCollection: AngularFirestoreCollection<Routine>;

  constructor(private afs: AngularFirestore) {
    this.routinesCollection = this.afs.collection<Routine>('routines');
    // this.routines = this.routinesCollection.valueChanges({ idField: 'id' });


    // this.routines = this.routinesCollection.valueChanges({ idField: 'id' }).pipe(
    //   switchMap((routines: Routine[]) => routines.map(routine => {
    //     return this.afs.collection<Exercise>(`routines/${routine.id}/exercises`)
    //       .valueChanges()
    //       .pipe(
    //         switchMap(async (subdocuments) => Object.assign(routine, { exercises: subdocuments })
    //         )
    //       );
    //   })
    //   ));

    this.routines = this.routinesCollection.valueChanges({ idField: 'id' }).pipe(
      map((routines: Routine[]) =>
        routines.map(routine => {
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
  }

  getAll() {
    return this.routines;

    // const owner = this.afs.collection('playlists',ref => ref.where('owner', '=', id)).valueChanges(idfield)
    // combineLatest([ownern reader]).pipe()
    // return AngularFirestore.collectionData()

  }

  async getOne(id: string) {

    return (await this.routinesCollection.doc(id).get().toPromise()).data();


    // return await this.routines.pipe(
    //   switchMap((routines: Routine[]) =>
    //     routines.map(routine => {
    //       return this.afs.collection(`routines/${routine.id}/exercises`)
    //         .valueChanges()
    //         .pipe(
    //           switchMap(async (subdocuments) => Object.assign(document, { exercises: subdocuments })
    //           )
    //         );
    //     })
    //   ),
    //   // flatMap(combined => combineLatest(combined))
    // );

    // doc = fs.doc(this.fr, 'playlist/${playlistId]}') as fr docref playlist
    // todocol = fr fromCollectionRef(this.firestore, playlist/playlistId todos) as fr collect
    // return fr.docdata>playlist>(docn [idField: 'id']).pipe{
    //   switchmap(playlist => fr collectiondata>todo>(todocollection, {idField: 'id'}).pipe(map))
    // }
  }

  addRoutine(routine: Routine) {
    return this.routinesCollection.add(Object.assign({}, routine))
  }

  addExercise(routineId: string, exercise: Exercise) {
    this.afs.collection("routines", ref => ref.where('id', '==', routineId)).add(exercise);
    //this.routinesCollection.doc(routineId).collection('exercises').doc(exercise.id).set(exercise);
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
