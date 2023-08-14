import { Component } from '@angular/core';
import axios from 'axios';
import { AuthService } from 'src/app/services/api/AuthService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  id: string = ''
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };
  
    console.log(loginData);
    axios.post('http://localhost:8080/api/user/login', loginData)
    .then(response => {
      console.log(response);
      this.id = response.data.id; 
      this.router.navigate([`/notes`]); 
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        this.errorMessage = 'Credenciales incorrectas';
        
      } else {
        console.log('Error de inicio de sesión', error);
      }
    });
  }

}
