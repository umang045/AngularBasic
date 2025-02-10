import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sellerorderlist',
  imports: [
    NgStyle,
    NzTableModule,
    ReactiveFormsModule,
    NzDividerModule,
    FormsModule,
    NzIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sellerorderlist.component.html',
  styleUrl: './sellerorderlist.component.css',
})

export class SellerorderlistComponent {
  router = inject(Router);
  toast = inject(ToastrService);
  userId: any;
  authService = inject(AuthservService);
  orderListData: any = [];

  ngOnInit() {
    this.getUserId();
    this.getSellerOrderList();
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
}
