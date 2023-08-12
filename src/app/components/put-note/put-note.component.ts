import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import axios from 'axios';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-put-note',
  templateUrl: './put-note.component.html',
  styleUrls: ['./put-note.component.css']
})
export class PutNoteComponent {

  constructor( private fb: FormBuilder, public dialog: MatDialogRef<PutNoteComponent>,
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
      title: 'Do you want to save the changes?',
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      showConfirmButton: true,
      confirmButtonText: `Sava`,
      confirmButtonColor: '#488D95'
    }).then((result) => {
      if (result.isConfirmed) {
      
        if (this.form.valid) {
          
          this.spinner = true;
          axios.put(`http://localhost:8080/api/notes/${this.element.id}`, {
            title: this.form.value.title,
            description: this.form.value.description
            
          }).then(() => {
            this.dialog.close(true);
            Swal.fire('The sale has been successfully completed');
            this.spinner = false;
          })
          .catch((error: any) => {
            Swal.fire('Problem when upgrading', error);
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
