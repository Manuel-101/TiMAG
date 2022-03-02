import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { Routine } from '../models/routine';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  routines: Observable<Routine[]> = EMPTY;
  routinesCollection: AngularFirestoreCollection<Routine>;

  constructor(private afs: AngularFirestore) {
    this.routinesCollection = this.afs.collection<Routine>('routines');
    this.routines = this.routinesCollection.valueChanges();
   }

  getAll(){
    return this.routines;
  }

  getOne(id: string){
    // return (await this.routines.toPromise()).find

    // exercise
    //return this.routinesCollection.get(find(p => p.id == id));
  }

  addRoutine(routine: Routine){
    return this.routinesCollection.add(Object.assign({},routine))
  }

  addExercise(routineId: number, exercise: Exercise){
    // todo
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
