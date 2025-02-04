import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotdialog',
  imports: [
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forgotdialog.component.html',
  styleUrl: './forgotdialog.component.css',
})
export class ForgotdialogComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthservService);
  router = inject(Router);
  toast = inject(ToastrService);
  readonly dialog = inject(MatDialog);

  isMailSend: any = false;

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  async sendEmails() {
    const mailData = this.emailForm.value;
    try {
      const result = await this.authService.userSendMail(mailData);
      console.log('Email Send Result:', result); // Log the result if needed
      this.toast.success('Email Sent Successfully To Your Account!!');
      this.isMailSend = true;
      this.dialog.closeAll();
      // this.emailForm.controls['email'].setValue('');
    } catch (error) {
      console.error('Error Sending Email:', error);
      this.toast.error('Something went wrong');
    }
  }
}
