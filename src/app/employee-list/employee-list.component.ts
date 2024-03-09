import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserServiceApiService } from '../user-service-api.service';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet, RouterLinkActive, CommonModule,CustomAlertComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  userList: any[];
  editUse: any;
  editUserForm: FormGroup;
  isFormVisible: boolean = false;
  errorMessage: string = '';
  sucessMessage: string='';
  
  alertMessage: string;
  alertType: 'success' | 'error';
  constructor(private userService: UserServiceApiService, private fb: FormBuilder) {
    this.editUserForm = this.fb.group({
      id:'',
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      roles: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllUser();
    this.isFormVisible=false;
  }

  getAllUser(){
    this.userService.getUsers().subscribe(
      (data) => {
        this.userList = data
      }, (error) => {
        console.log('error->' + error.error.detail)
      });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      (data) => {
        console.log(data)
        this.showAlert("deleted sucess", "error");
    this.getAllUser;
    this.isFormVisible=false;

      }, (error) => {
        this.showAlert("deleted failed", "error");
      });
  }


  editRow(user: User): void {
    this.isFormVisible = true;
    this.editUserForm.setValue({
      id:user.id,
      name: user.name,
      email: user.email,
      roles: user.roles
    });
  }

  saveRow(): void {
    this.userService.editser(this.editUserForm.value).subscribe(
      (data) => {
        console.log(data)
        this.showAlert("Updated sucess", "success");
        this.ngOnInit();
      }, (error) => {
        this.showAlert("unable to update", "error");
      });
  }

  cancelEdit(): void {
    this.isFormVisible=false;
    this.editUserForm.reset();
  }


  showAlert(message: string, type: 'success' | 'error'): void {
 console.log('alert')
    this.alertMessage = message;
    this.alertType = type;
  }

  onCloseAlert(): void {
    this.alertMessage = null;
    this.alertType = null;
  }
}