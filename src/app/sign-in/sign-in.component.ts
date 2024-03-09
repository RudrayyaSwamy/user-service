
import { Component, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserServiceApiService } from '../user-service-api.service';
import { CommonModule } from '@angular/common';
import { Authrequest } from '../model/authrequest';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterOutlet,RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})


export class SignInComponent {

  errorMessage: string = '';
  authRequest:Authrequest;
  formData = {
    username: '',
    password: ''
  };

  constructor(private service: UserServiceApiService, private router: Router) {}
  
  onSubmit() {
    let user = { 
      username: this.formData.username,
      password: this.formData.password
    }
    this.service.getAuthanicate(user).subscribe(
      (data) => {
        localStorage.setItem("tocken", data.tocken)
        localStorage.setItem("username", data.username)
        this.router.navigateByUrl('/home');
      }, (error) => {
       this.errorMessage =error.error.detail;
      });
  }

}
