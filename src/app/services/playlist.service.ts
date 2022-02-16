import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Playlist } from '../models/playlist';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  playlists: Observable<Playlist[]> = EMPTY;
  playlistsCollection: AngularFirestoreCollection<Playlist>;


  constructor(private afs: AngularFirestore) {
    this.playlistsCollection = this.afs.collection<Playlist>('lists');
    this.playlists = this.playlistsCollection.valueChanges();
   }

  getAll() {
    return this.playlists;
  }

  getOne(id: number) {
    // todo
    // return this.playlistsCollection. get find(p => p.id === id);
  }

  addPlaylist(playlist: Playlist) {

    this.playlistsCollection.add(Object.assign({}, playlist))
  }

  removePlaylist(playlist: Playlist) {
    // this.playlists = this.playlists.filter(p => p.id !== playlist.id);
  }

  addTodo(playlistId: number, todo: Todo) {
    // const playlistIndex = this.playlists.findIndex(p => p.id === playlistId);
    // if (this.playlists[playlistIndex]) {
    //   this.playlists[playlistIndex].todos = this.playlists[playlistIndex].todos.concat(todo);
    // }
  }

  removeTodo(playlistId: number, todo: Todo) {
    // const playlistIndex = this.playlists.findIndex(p => p.id === playlistId);
    // if (this.playlists[playlistIndex]) {
    //   this.playlists[playlistIndex].todos = this.playlists[playlistIndex].todos.filter(t => t.id !== todo.id);
    // }
  }
}
