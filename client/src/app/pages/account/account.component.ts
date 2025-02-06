import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { ToastrService } from 'ngx-toastr';
import { ProdsevService } from '../../core/services/product/prodsev.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdatePassComponent } from '../updatePass/update-pass/update-pass.component';
import { UserAddressComponent } from '../userAddress/user-address/user-address.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { GooglmapComponent } from '../googlemap/googlmap/googlmap.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-account',
  imports: [
    CommonModule,
    NzIconModule,
    NzModalModule,
    MatDialogModule,
    NzCollapseModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthservService);
  prodService = inject(ProdsevService);

  dialog = inject(MatDialog);

  router = inject(Router);
  toast = inject(ToastrService);
  userId: any;
  profileImgUrl: any = '';
  profileImgId: any;

  addressData: any = [];

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    user_id: new FormControl(null),
  });

  ngOnInit() {
    this.getUserId();
    this.fetchUserById();
    this.fetchUsersAddress();
    // console.log();
  }

  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
    this.profileForm.controls['user_id'].setValue(this.userId);
    console.log(this.userId);
  }

  async fetchUserById() {
    try {
      const result = await this.authService.getUserById(this.userId);
      // this.profileForm.patchValue(result.data?.email);
      this.profileForm.controls['email'].setValue(result?.email);
      this.profileForm.controls['name'].setValue(result?.name);
      this.profileForm.controls['mobile'].setValue(result?.mobile);
      this.profileImgUrl = result?.profile_pic;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async handleFile(event: any) {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const selectedFiles = fileInput.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const fileToUpload = selectedFiles[0];
      console.log(fileToUpload);
      const formData = new FormData();

      if (this.profileImgId != undefined) {
        const result = await this.prodService.delProdImg(this.profileImgId);
        console.log(result);
      }
      formData.append('image', fileToUpload);
      const result = await this.prodService
        .uploadProdImg(formData)
        .then((rs) => {
          this.profileImgUrl = rs?.data?.url;
          // this.profileForm.controls['profile_pic'].setValue(this.profileImgUrl);
          this.profileImgId = rs?.data?.public_id;
          console.log(rs);
        })
        .then(async () => {
          await this.authService.updateProfile({
            profile_pic: this.profileImgUrl,
            user_id: this.userId,
          });
        });
      // this.productForm.controls['image'].setValue(this.uploadedImgUrl);
      // console.log(this.productForm.controls['image'].value);

      console.log(result);
      console.log(this.profileImgUrl);
      // console.log(this.profileForm.controls['profile_pic'].value);
      // this.pro
    }
  }

  async submitForm() {
    this.profileForm.controls['user_id'].setValue(this.userId);
    const profileData = this.profileForm.getRawValue();
    console.log(profileData);

    try {
      const result = await this.authService.updateUsersProfile(profileData);
      console.log(result);
      this.fetchUserById();
      this.toast.success('Your Profile Updated Succesfully!!');
    } catch (error) {
      console.log(error);
    }
  }

  openForgotDialog() {
    const dialogRef = this.dialog.open(UpdatePassComponent, {
      height: 'auto',
      width: '600px',
    });
  }

  openAddressDialog() {
    const dialogRef = this.dialog.open(GooglmapComponent, {
      height: 'auto',
      width: 'auto',
      data: this.userId,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.fetchUsersAddress();
    });
  }

  async fetchUsersAddress() {
    try {
      const result = await this.authService.fetchUsersAddress(this.userId);
      this.addressData = result;
      console.log(this.addressData);

      // console.log(result);
    } catch (error: any) {
      this.toast.error(error.error);
    }
  }

  async delUserAddress(id: any) {
    try {
      const result = await this.authService.delUsersAddress(id);
      console.log(id);
      this.fetchUsersAddress();
      this.toast.success('address Deleted Succesfully!!');
    } catch (error: any) {
      this.toast.error(error.error);
    }
  }
}
