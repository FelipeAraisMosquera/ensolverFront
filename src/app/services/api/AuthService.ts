import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    id: string = '';
  private apiURL = 'http://localhost:8080/api/user/login'; 

  constructor() { }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    };

    return from(axios.post(`http://localhost:8080/api/user/login`, loginData));
  }
}
