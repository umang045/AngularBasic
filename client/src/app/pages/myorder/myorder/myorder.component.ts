import { Component, inject } from '@angular/core';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { CommonModule } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-myorder',
  imports: [
    CommonModule,
    NzTableModule,
    NzModalModule,
    NzIconModule,
    NzPaginationModule,
  ],
  templateUrl: './myorder.component.html',
  styleUrl: './myorder.component.css',
})
export class MyorderComponent {
  authService = inject(AuthservService);
  userId: any;
  orderData: any = [];
  orderProducts: any = [];
  tost = inject(ToastrService);

  ngOnInit() {
    this.getUserId();
    this.getUserOrderData();
  }

  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
    console.log(this.userId);
  }

  async getUserOrderData() {
    try {
      const result = await this.authService.getUsersOrde(this.userId);
      this.orderData = result;
      console.log(this.orderData);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserOrderProdData(order_id: any) {
    console.log(order_id);
    try {
      const result = await this.authService.getUsersOrderProd(order_id);
      this.orderProducts = result;
      console.log(this.orderProducts);
    } catch (error) {
      console.log(error);
    }
  }

  async cancleUserOrder(order_id: any) {
    try {
      const cnfrm = confirm('are you sure?');
      if (!cnfrm) return;

      const cancleData: any = {
        status: 'Cancelled',
        order_id: order_id,
        user_id: this.userId,
      };
      const result = await this.authService.cancleUserOrder(cancleData);
      this.tost.success('Your Order Cancle Succesfully');
    } catch (error) {
      console.log(error);
    }
  }

  isVisible = false;

  showModal(order_id: any): void {
    this.isVisible = true;
    this.getUserOrderProdData(order_id);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
