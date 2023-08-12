import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {

  constructor( private fb: FormBuilder, public dialog: MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {  }

  spinner: boolean = false;
  element = this.data.content;
  form!: FormGroup;
  cities!: Array<any>;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
    });
    this.initValuesForm();
  }

  private initValuesForm(): void {    
    this.form.patchValue({
      title: this.element.title,
      description: this.element.description,
    });
  }

  cancelModify() {
    this.dialog.close(true);
  }

  onSubmit() {
    Swal.fire({
      icon: 'question',
      title: '¿want to save the note?',
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      showConfirmButton: true,
      confirmButtonText: `Save`,
      confirmButtonColor: '#488D95'
    }).then((result) => {
      if (result.isConfirmed) {
      
        if (this.form.valid) {
          this.spinner = true;
          
          axios.post(`http://localhost:8080/api/notes/2`, {
            title: this.form.value.title,
            description: this.form.value.description
          }).then(() => {
            this.dialog.close(true);
            Swal.fire('The note has been successfully created');
            this.spinner = false;
          })
          .catch((error: any) => {
            console.log(error);
            Swal.fire('Problem when Creating', error);
          });
         
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Invalid data',
            text: 'Please fill in the data correctly',
            background: '#fff',
            confirmButtonColor: '#045b62'
          });
          console.log("Form error");
        }
      } else if (result.isDenied) {
        Swal.fire('Changes have not been saved', '', 'info')
      }
    })
  }

}
