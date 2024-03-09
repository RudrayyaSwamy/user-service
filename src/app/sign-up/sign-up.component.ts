import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceApiService } from '../user-service-api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,RouterOutlet,RouterLinkActive,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup =null;
  passwordMisMatch: string = '';
  errorMessage: string = '';
  sucessMessage: string='';
  constructor(private fb: FormBuilder,private service: UserServiceApiService) { }
 
  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', Validators.required],
      roles: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Function to handle form submission
  onSubmit() {
    if(this.signupForm.value.password != this.signupForm.value.confirmPassword){
      this.passwordMisMatch="Password doesn't matched";
    }
    if (this.signupForm.valid) {
      this.service.userSignUp(this.signupForm.value).subscribe(
        (data) => {
          console.log(data)
           this.sucessMessage='User created sucessfully';
        }, (error) => {
         this.errorMessage =error.error.detail;
        });
      }
  }

  // Function to check if a form control has been touched and has an error
  hasError(controlName: string, errorName: string) {
    const control = this.signupForm.get(controlName);
    return control.touched && control.hasError(errorName);
  }

  hasPasswordMisMatchedError(controlName: string, errorName: string,form: FormGroup) {
    const confirmPasswordVal= this.signupForm.get(controlName);
    const password = form.get('password').value;
    return !(confirmPasswordVal.touched && (password === confirmPasswordVal));
  }
}