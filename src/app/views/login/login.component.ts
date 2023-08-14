import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/api/AuthService';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
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

        const token = response.data.token;
        const userId = response.data.user.id;
        const name = response.data.user.name;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('name', name);


        

        this.router.navigate(['/notes']);
      })
      .catch(error => {
        if (error.response && error.response.status) {
          this.errorMessage = 'Credenciales incorrectas';
        } else {
          console.log('Error de inicio de sesión', error);
        }
      });
  }
}
