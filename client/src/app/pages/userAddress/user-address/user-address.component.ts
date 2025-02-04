import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, inject, NgModule } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectServiceService } from '../../../core/services/select/select-service.service';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthservService } from '../../../core/services/auth/authserv.service';

@Component({
  selector: 'app-user-address',
  imports: [
    NgFor,
    JsonPipe,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatOptionModule,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.css',
})

export class UserAddressComponent {
  selectService = inject(SelectServiceService);
  authService = inject(AuthservService);
  addressForm = new FormGroup({
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
  });

  state: any = [];
  country: any = [];
  city: any = [];

  ngOnInit() {
    this.getAllCountry();
  }

  async getAllCountry() {
    try {
      const result = await this.selectService.getAllCountry();
      this.country = result?.data;

      // console.log(this.country);
    } catch (error) {
      console.log(error);
    }
  }

  async onCountryChange(event: any) {
    try {
      // console.log(event?.target?.value);
      const countryData = JSON.parse(event?.target.value);
      const id = countryData?.id;
      console.log(countryData?.name);
      
      // this.addressForm.controls['country'].setValue(countryData?.name);

      const result: any = await this.selectService.getState(id);
      this.state = result?.data;
      this.city = [];
      // console.log(result?.data);
    } catch (error) {
      console.log(error);
    }
  }

  async onStateChange(event: any) {
    try {
      const stateData = JSON.parse(event?.target.value);
      const id = stateData?.id;
      // this.addressForm.controls['state'].setValue(stateData?.name);
      const result: any = await this.selectService.getCity(id);
      this.city = result?.data;
      // console.log(result?.data);
    } catch (error) {
      console.log(error);
    }
  }

  onCityChange(event: any) {
    const stateData = JSON.parse(event?.target.value);
    const id = stateData?.id;
    // this.addressForm.controls['city'].setValue(stateData?.name);
  }

  async addUserAdd() {
    try {
      const updateData = this.addressForm.getRawValue();
      console.log(updateData);

      // const result = await this.authService.addUsersAddress(updateData);
    } catch (error) {}
  }
}
