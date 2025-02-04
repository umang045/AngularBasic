import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-pass',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './update-pass.component.html',
  styleUrl: './update-pass.component.css',
})
export class UpdatePassComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthservService);

  readonly dialog = inject(MatDialog);
  router = inject(Router);
  toast = inject(ToastrService);
  userId: any;
  isPassCorrect: any = false;

  updatePassForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
    user_id: new FormControl(null),
  });

  ngOnInit() {
    this.getUserId();
  }

  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
    this.updatePassForm.controls['user_id'].setValue(this.userId);
    console.log(this.userId);
  }

  async checkPassword() {
    const chekPassData = this.updatePassForm.getRawValue();
    console.log(chekPassData);
    try {
      const result = await this.authService.checkPass(chekPassData);
      this.isPassCorrect = true;
      this.toast.success('Password is correct');
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword() {
    try {
      const updatePassData = this.updatePassForm.getRawValue();
      const result = await this.authService.updatePass(updatePassData);
      this.toast.success('Password updated successfully');
      this.dialog.closeAll();
    } catch (error) {
      console.log(error);
    }
  }
}
