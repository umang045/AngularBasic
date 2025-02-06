import { Component, inject } from '@angular/core';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  authService = inject(AuthservService);
  router = inject(Router);
  tost = inject(ToastrService);

  cartData: any = [];
  userId: any;
  quantity: any;
  total: any = 0;

  ngOnInit() {
    this.getUserId();
    this.fetchUserCart();
  }

  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
  }

  async updateQuantity(event: any) {
    const quantity = event?.event?.target.value;
    const pid = event?.pid;

    try {
      await this.authService.updateCartQuantity({
        pid: pid,
        uid: this.userId,
        quntity: quantity,
      });

      const itemIndex = this.cartData.findIndex((item: any) => item.id === pid);
      if (itemIndex !== -1) {
        this.cartData[itemIndex].quantity = quantity;
        this.total = this.calculateTotal();
      }
      await this.fetchUserCart();
    } catch (error) {
      this.tost.error('Something Went Wrong');
    }
  }

  async delProdFromCart(id: any) {
    try {
      await this.authService.userDelFromCart(id);
      this.tost.success('Item Removed Successfully!!');
      await this.fetchUserCart();
    } catch {
      this.tost.error('Error Occurred!!');
    }
  }

  handleRoute(url: any) {
    this.router.navigateByUrl(`/${url}`);
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
}
