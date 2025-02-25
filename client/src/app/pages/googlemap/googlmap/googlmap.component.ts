import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrService } from 'ngx-toastr';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-googlmap',
  imports: [CommonModule, FormsModule, NgFor, GoogleMap, GoogleMapsModule],
  templateUrl: './googlmap.component.html',
  styleUrl: './googlmap.component.css',
})

//export class googlemap
export class GooglmapComponent {
  http = inject(HttpClient);
  toast = inject(ToastrService);
  center: google.maps.LatLngLiteral = { lat: 23.0225, lng: 72.5714 };
  zoom = 12;
  locationDetail: any = {};
  authService = inject(AuthservService);
  addressData: any = [];
  userId: any;

  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];

  ngOnInit() {
    this.getUserId();
    this.fetchUsersAddress();
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (this.markers.length > 2) {
      this.toast.info('You can add only three location');
      return;
    }
    if (event.latLng) {
      const position = event.latLng.toJSON();
      this.markers.push({
        position,
        title: `Marker at (${position.lat},${position.lng})`,
      });
      // console.log(this.markers);
      // this.locationDetail()
      this.getLocationDetail(position.lat, position.lng);
    }
  }

  async getLocationDetail(lat: any, lng: any) {
    // const apiKey = 'AIzaSyDyRgEnNYrrkDqnJNETjacyPv0AR39uM6c';
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    let addUserAddData = {};
    try {
      const data: any = await firstValueFrom(this.http.get(url));
      // console.log(data?.address);
      addUserAddData = {
        country: data?.address?.country,
        state: data?.address?.state,
        city: data?.address?.state_district,
        address: null,
        pincode: data?.address?.postcode,
        lat: lat,
        lng: lng,
        users_id: this.userId,
      };
      // console.log(addUserAddData);

      const resultSet = await this.authService.addUsersAddress(addUserAddData);
      this.toast.success('address added');
      // console.log(resultSet);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error.message);
    }
  }

  async fetchUsersAddress() {
    try {
      const result = await this.authService.fetchUsersAddress(this.userId);
      this.addressData = result;

      this.addressData.forEach((address: any) => {
        this.markers.push({
          position: { lat: address.lat, lng: address.lng },
          title: `Marker at (${address.lat},${address.lng})`,
        });
      });
    } catch (error: any) {
      this.toast.error(error.error);
    }
  }

  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
    console.log(this.userId);
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
