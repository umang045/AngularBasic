import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpass',
  imports: [NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './resetpass.component.html',
  styleUrl: './resetpass.component.css',
})
export class ResetpassComponent {
  route = inject(Router);
  authService = inject(AuthservService);
  toast = inject(ToastrService);
  router = inject(Router);
  resetForm = new FormGroup({
    newpass: new FormControl('', [Validators.required]),
    cnfirmpass: new FormControl('', [Validators.required]),
  });

  token = this.route.url.toString().split('/')[2];

  ngOnInit() {}

  async updateUserPass() {
    try {
      const resetData: Object = {
        token: this.token,
        newPassword: this.resetForm.controls['newpass'].value,
      };

      const result = await this.authService.userResetPass(resetData);
      this.toast.success('Password Reset Succesfully');
      this.route.navigateByUrl('/login');
    } catch (error: any) {
      this.toast.error('Token hasbeen expire!!');
    }
  }
}
