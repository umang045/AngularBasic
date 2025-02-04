import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { Router } from '@angular/router';
import { ForgotdialogComponent } from '../forgotdialog/forgotdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthservService);
  router = inject(Router);
  tost = inject(ToastrService);
  route = inject(Router);
  readonly dialog = inject(MatDialog);
  role: any;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.checkLogin();
    this.getUserRole();
  }

  checkLogin() {
    const userLocalDetail = localStorage.getItem('userDetail');
    if (userLocalDetail !== null) {
      this.route.navigateByUrl('/');
    }
  }

  async loginUser() {
    const data = this.loginForm.getRawValue();
    try {
      const result: any = await this.authService.userLogin(data);
      localStorage.setItem(
        'userDetail',
        JSON.stringify({
          id: result?.others?.user_id,
          role: result?.others?.uesrsRole,
          token: result?.token,
        })
      );
      this.tost.success('Login Successfully!');
      this.router.navigateByUrl('/home');
    } catch (error) {
      console.error('Login Error:', error);
      this.tost.error('something Went Wrong');
    }
  }

  handleNavigate(lnk: any) {
    this.router.navigate([lnk]);
  }

  openForgotDialog() {
    const dialogRef = this.dialog.open(ForgotdialogComponent, {
      height: 'auto',
      width: '600px',
    });
  }

  getUserRole() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    console.log(id , localData);
  }
}
