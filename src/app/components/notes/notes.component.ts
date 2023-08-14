import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios, { AxiosResponse } from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { PutNoteComponent } from '../put-note/put-note.component';
import Swal from 'sweetalert2';
import { AddNoteComponent } from '../add-note/add-note.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/api/DataService';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

 name = localStorage.getItem('name');
  
  notes!: Array<any>;
  id: number | null = null;
  title: string = '';
  description: string = '';
  date: string = '';
  userId: number | null = null;
  dataSource = new MatTableDataSource();

  constructor(private dialog: MatDialog, private router:Router, private dataService: DataService) { }

  ngOnInit() {
    this.findNotes() 
    
    
  }
  
  

  logout() {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    localStorage.removeItem('name'); 

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  deleteNote(event: Event,element: any) {
    event.stopPropagation();
    Swal.fire({
      icon: 'question',
      title: '¿Do you want to remove note?',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#488D95',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/notes/${element.id}`)
          .then(() => {
            this.notes = this.notes.filter((note) => note.id !== element.id);
            Swal.fire('The note has been successfully removed');
            this.findNotes();
          })
          .catch((error: any) => {
            console.log(error);
            Swal.fire('Error deleting note', error);
          });
      } else if (result.isDismissed) {
        Swal.fire('The note has not been deleted', '', 'info');
      }
    });
  }

  findNotes(){
    
  const userId = localStorage.getItem('userId');
   axios.get(`http://localhost:8080/api/notes/${userId}`)
   .then((response: any) => {
    this.notes = response.data; 
    this.dataSource.data = this.notes; 
    console.log(this.notes);
  })
  .catch((error: any) => {
    console.log('No funciona', error);
  });
  }
  

  addNote(){
    const userId = localStorage.getItem('userId');
      axios.post(`http://localhost:8080/api/notes/${userId}`, 
      {
        title: this.title,
        description: this.description
      }
    )
      .then((Response: AxiosResponse)=> {
        console.log(Response.data);
        this.findNotes();
      })
      .catch((error: any) => {
        console.log('It does not work, there is an error', error);
      });
  }

 
  putNote(){
    axios.put('http://localhost:8080/api/notes', 
    {
      title: this.title,
      description: this.description
    }
  )
    .then((Response: AxiosResponse)=> {
      console.log(Response.data);
      this.findNotes();
    })
    .catch((error: any) => {
      console.log('It does not work, there is an error', error);
    });
}
  
openDialog(element: any): void {

  const config = {
    data: {
      message: element ? 'Edit note' : 'Error',
      content: element
    }
  };
  const dialogRef = this.dialog.open(PutNoteComponent, config);
  dialogRef.afterClosed().subscribe(result => {
    this.findNotes();
  });
}

openDialogAdd() {
  console.log("enter");
    const config = {
      data: {
        message:  'Add note',
        error: 'Error'
      }
    };
    const dialogRef = this.dialog.open(AddNoteComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.findNotes();
    });
  }
       
/*
  limpiarTabla(){
    const tablaBody = document.getElementById('tabla-body') as HTMLTableSectionElement;
    tablaBody.innerHTML = '';
  }

*/
}
