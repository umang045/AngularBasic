import { Component, inject } from '@angular/core';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  ActivatedRoute,
  RouterOutlet,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-seller-single-order',
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './seller-single-order.component.html',
  styleUrl: './seller-single-order.component.css',
})
export class SellerSingleOrderComponent {
  route = inject(ActivatedRoute);
  // routerLink = inject(RouterLink)
  authService = inject(AuthservService);
  order_id = this.route.snapshot.params['order_id'];
  usersOrderData: any = [];
  userOrdrProd: any = [];

  ngOnInit() {
    this.getSingleSeller();
  }

  // get single orderof seller
  async getSingleSeller() {
    try {
      const result = await this.authService.getSellerSingleOrder(this.order_id);
      this.usersOrderData = result[0];
      this.userOrdrProd = result[1];
      console.log(this.usersOrderData, this.userOrdrProd);
    } catch (error) {
      console.log(error);
    }
  }
}
