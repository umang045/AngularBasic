import { Component, inject } from '@angular/core';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { CommonModule } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
@Component({
  selector: 'app-myorder',
  imports: [
    CommonModule,
    NzTimelineModule,
    NzTableModule,
    NzModalModule,
    NzDrawerModule,
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

  size: any = 'large';
  selectedOrderStatus: any;

  ngOnInit() {
    this.getUserId();
    this.getUserOrderData();
  }

  close(): void {
    this.isVisible = false;
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
    const order = this.orderData.find((o: any) => o.order_id === order_id);
    if (order) {
      this.orderProducts = order.products;
      this.selectedOrderStatus = order.status;
      this.isVisible = true;
    }
    this.getUserOrderProdData(order_id);
  }

  getTimelineItems(): any[] {
    const stages = [
      { status: 'pending', label: 'Pending', color: 'yellow-400' },
      { status: 'Dispatched', label: 'Dispatched', color: 'blue-300' },
      { status: 'Out For Delivery', label: 'Out for Delivery', color: 'gray-500' },
      { status: 'Delivered', label: 'Delivered', color: 'green-300' },
      { status: 'Cancelled', label: 'Cancelled', color: 'red-400' }
    ];
    const currentIndex = stages.findIndex(stage => stage.status === this.selectedOrderStatus);
    return stages.slice(0, currentIndex + 1);
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
