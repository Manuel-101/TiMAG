import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, fromCollectionRef } from '@angular/fire/compat/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { Routine } from '../models/routine';
import { collection, query, where } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  routines: Observable<Routine[]> = EMPTY;
  routinesCollection: AngularFirestoreCollection<Routine>;

  constructor(private afs: AngularFirestore) {
    this.routinesCollection = this.afs.collection<Routine>('routines');
    this.routines = this.routinesCollection.valueChanges({idField: 'id'});
   }

  getAll(){
    return this.routines;
  }

  async getOne(id: string){

    return (await this.routinesCollection.doc(id).get().toPromise()).data() ;
    // return this.afs
    //             .collection<Routine>('routines')
    //             .doc(id)
                // .ref
                // .get()
                // .then((doc) =>{
                //   if (doc.exists){
                //     console.log(doc.data());
                //     return doc.data()
                //   } else {
                //     console.log("routine doesn't exist pal...")
                //     return new Routine("empty", "string", null);
                //   }
                // })
                // .catch((err) => {
                //   console.error(err);
                // })
  }

  addRoutine(routine: Routine){
    return this.routinesCollection.add(Object.assign({},routine))
  }

  addExercise(routineId: string, exercise: Exercise){
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
