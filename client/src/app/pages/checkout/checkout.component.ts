import { Component, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    NzSelectModule,
    GoogleMap,
    NzModalModule,
    GoogleMapsModule,
    NzIconModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  Razorpay: any;

  http = inject(HttpClient);
  toast = inject(ToastrService);
  center: google.maps.LatLngLiteral = { lat: 23.0225, lng: 72.5714 };
  zoom = 12;
  locationDetail: any = {};
  authService = inject(AuthservService);
  addressData: any = [];
  userId: any;
  cartData: any = [];
  total: any;
  tost = inject(ToastrService);
  selectedAddressId: any = null;
  payment_method: any = 'select';
  router = inject(Router);

  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];

  constructor() {
    this.Razorpay = (window as any).Razorpay;
  }

  ngOnInit() {
    this.getUserId();
    this.fetchUsersAddress();
    this.fetchUserCart();
  }

  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: `${this.total * 100}`,
      name: 'Bhagwan bhala karega!!',
      key: 'rzp_test_rsW4Snw7J4ty0R',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      theme: {
        color: '#6466e3',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
        },
      },
      handler: this.paymentSuccessHandler.bind(this),
    };

    // const successCallback = async (paymentid: any) => {
    //   console.log(paymentid);
    //   try {
    //     const result = await this.authService.placeOrder({
    //       payment_method: this.payment_method,
    //       address_id: this.selectedAddressId,
    //       user_id: this.userId,
    //       payment_status: 'done',
    //     });
    //     this.toast.success('Order placed successfully!');
    //   } catch (error) {
    //     console.log(error);
    //     this.toast.error('Error placing order');
    //   }
    // };

    // const failureCallback = (e: any) => {
    //   console.log(e);
    //   this.toast.error('Payment failed');
    // };

    const rzp = new this.Razorpay(RozarpayOptions);
    rzp.open();
  }

  async paymentSuccessHandler(response: any) {
    console.log('Payment successful, response:', response);

    try {
      const result = await this.authService.placeOrder({
        payment_method: this.payment_method,
        address_id: this.selectedAddressId,
        user_id: this.userId,
        payment_status: 'done',
      });
      this.toast.success('Order placed successfully!');
      setTimeout(() => {
        this.router.navigate(['/order/' + this.userId]);
      }, 2000);
    } catch (error) {
      console.log(error);
      this.toast.error('Error placing order');
    }
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
      this.fetchUsersAddress();
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

  handleSelectedAddress(address_id: any) {
    this.selectedAddressId = address_id;
    console.log(this.selectedAddressId);
  }

  async fetchUserCart() {
    try {
      const result = await this.authService.getUserCart(this.userId);
      this.cartData = result;
      this.total = this.calculateTotal();
    } catch (error) {
      this.tost.error('Error fetching cart data');
    }
  }

  calculateTotal() {
    return this.cartData.reduce((acc: any, item: any) => {
      if (
        item?.active == true &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number'
      ) {
        return acc + item.price * item.quantity;
      }
      return acc;
    }, 0);
  }

  handlePayChange(event: any) {
    // console.log(event);
    this.payment_method = event;
  }

  async placeOrder() {
    try {
      if (this.payment_method == 'online') {
        // console.log('online method');
        this.payNow();
        return;
      }
      const result = await this.authService.placeOrder({
        payment_method: this.payment_method,
        address_id: this.selectedAddressId,
        user_id: this.userId,
        payment_status: 'pending',
      });
      this.toast.success('order Placed Succesfully!!');
      setTimeout(() => {
        this.router.navigate(['/order/' + this.userId]);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
}
