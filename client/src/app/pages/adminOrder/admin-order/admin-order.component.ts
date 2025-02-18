import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-order',
  imports: [
    CommonModule,
    RouterLink,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
  ],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css',
})
export class AdminOrderComponent {
  authService = inject(AuthservService);
  adminOrders: any = [];

  ngOnInit() {
    this.getAdminsOrders();
  }

  async getAdminsOrders() {
    const result = await this.authService.getOrdersForAdmin();
    this.adminOrders = result;
    // console.log(this.adminOrders);
  }

}
