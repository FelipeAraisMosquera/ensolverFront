import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './views/login/login.component';
import { NotesComponent } from './components/notes/notes.component';


const routes: Routes = [
  {path:'' , redirectTo: 'login' , pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'notes', component:NotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, NotesComponent]
