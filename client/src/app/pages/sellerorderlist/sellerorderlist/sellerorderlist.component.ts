import { Component, inject, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { en_US, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-sellerorderlist',
  imports: [
    NgStyle,
    NzTableModule,
    MatSlideToggleModule,
    NzSelectModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzDividerModule,
    FormsModule,
    NzIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sellerorderlist.component.html',
  styleUrl: './sellerorderlist.component.css',
  providers: [{ provide: NZ_DATE_LOCALE, useValue: en_US }],
})
export class SellerorderlistComponent {
  router = inject(Router);
  toast = inject(ToastrService);
  userId: any;
  authService = inject(AuthservService);
  orderListData: any = [];
  isEventOn: any;

  date = null;

  ngOnInit() {
    this.getUserId();
    this.getSellerOrderList();
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  //get user id
  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
    console.log(this.userId);
  }

  //get all orderlist
  async getSellerOrderList() {
    try {
      const result = await this.authService.getAllSellerOrders(this.userId);
      this.orderListData = result;
      console.log(result);
    } catch (error) {
      this.toast.error('something went wrong');
      console.log(error);
    }
  }

  //get prod by date
  async handleTimeChange(event: any) {
    // console.log(event);
    try {
      const result = await this.authService.getSellersFillterdOrdrByTime(event);
      // console.log(result);
      this.orderListData = result;
    } catch (error) {
      console.log(error);
    }
  }

  //get prod by status
  async handleStatusChange(event: any) {
    // console.log(event);
    try {
      const result = await this.authService.getSellersFillterdOrdrByStatus(
        event
      );
      this.orderListData = result;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  //event shedular on off
  async handleEvent() {
    try {
      const result = await this.authService.onOffEventSchedular();
      console.log(result?.currentState);
      result?.currentState == 'ON'
        ? (this.isEventOn = true)
        : (this.isEventOn = false);
    } catch (error) {
      console.log(error);
    }
  }
}
