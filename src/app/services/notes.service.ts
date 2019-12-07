import { Injectable } from '@angular/core';
import { Note } from '../note';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.notes=[];
    this.notesSubject = new BehaviorSubject([]);
  }
  fetchNotesFromServer() {
    return this.httpClient.get<Note[]>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `${this.authService.getBearerToken()}`)
    }).subscribe(noteresult=>{

      this.notes=noteresult;
      this.notesSubject.next(this.notes);
    },
    (err:any)=>{
      this.notesSubject.error(err);
    } 
    )
  }

  getNotes(): Observable<Array<Note>> {
    return this.notesSubject; 
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `${this.authService.getBearerToken()}`)
    }).pipe(tap(addedNote=>{
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    }))
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `${this.authService.getBearerToken()}`)
    }).pipe(tap(editedNote=>{
      let note = this.notes.find(note => note.id== editedNote.id);
      Object.assign(note,editedNote);
      this.notesSubject.next(this.notes);
    }))

  }

  getNoteById(noteId): Note {
    let foundNote=this.notes.find(note => note.id==noteId);
    return foundNote;
  }
}
