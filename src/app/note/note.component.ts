import { RouterService } from '../services/router.service';
import { Note } from '../note';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  note: Note;
  constructor(private router: RouterService) {
  }
  editNote() {
   this.router.routeToEditNoteView(this.note.id);
   console.log('editNote() from Note.. :', this.note);
  }
}
