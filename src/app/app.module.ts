import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { HeaderComponent } from './header/header.component';
import { ListViewComponent } from './list-view/list-view.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateRouteGuard } from './can-activate-route.guard';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard] }

];
@NgModule({
  declarations: [
    DashboardComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    HeaderComponent,
    ListViewComponent,
    LoginComponent,
    NoteComponent,
    NoteTakerComponent,
    NoteViewComponent,
    AppComponent
   ],
  imports: [ 
    [RouterModule.forRoot(routes)]
  ],
  providers: [ 
    AuthenticationService,
    NotesService,
    RouterService
  ],
  bootstrap: [AppComponent ],
  entryComponents: [ ],
  exports: [RouterModule]
})

export class AppModule { }
