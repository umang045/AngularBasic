import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { ProdsevService } from '../../core/services/product/prodsev.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxStarsModule } from 'ngx-stars';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-singleprod',
  imports: [
    NzModalModule,
    NzIconModule,
    NgxStarsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxImageZoomModule,
  ],
  templateUrl: './singleprod.component.html',
  styleUrl: './singleprod.component.css',
})
export class SingleprodComponent {
  route = inject(Router);
  authService = inject(AuthservService);
  prodService = inject(ProdsevService);
  tost = inject(ToastrService);
  allProduct: any = [];
  singleProd: any = [];
  productReviews: any = [];
  cartData: any = [];
  myThumNail: any = '';

  P_id = Number.parseInt(this.route.url.toString().split('/')[2]);
  ratting: any;
  userId: any;

  selectedSize: any = '';
  selectedColorId: any = 0;
  qntyty: any = 1;

  isAdded = false;

  singleUserReview: any = [];

  reviewForm = new FormGroup({
    review: new FormControl('', [Validators.required]),
    rating: new FormControl(''),
    color_id: new FormControl(''),
  });

  colors: any = [];

  ngOnInit() {
    this.getSingleProducts();
    this.fetchProductsReviews();
    this.getUserId();
    this.fetchUserCart();
    this.getUserReview();
    console.log(this.reviewForm.controls['color_id'].value);
    console.log(this.isAdded);
  }

  async getSingleProducts() {
    try {
      const result = await this.prodService.getSingleProd(this.P_id);
      this.myThumNail = result[0][0]?.image;

      this.singleProd = result[0];
      this.colors = result[1];
      console.log(this.colors);
    } catch (error) {
      console.log(error);
    }
  }

  handleQuantity(event: any) {
    this.qntyty = event.target.value;
    // console.log(event.target.value);
  }

  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
  }

  handleNavigate(url: any) {
    this.route.navigateByUrl(`${url}`);
  }

  async fetchProductsReviews() {
    try {
      const result = await this.prodService.getProductReviews(this.P_id);
      this.productReviews = result.filter((e: any) => e.user_id != this.userId);
    } catch (error) {
      console.log(error);
    }
  }

  async addReviewOfProduct() {
    console.log(this.ratting);

    if (this.ratting == undefined) {
      this.tost.error('Please Give Rating!!');
      return;
    }
    const review = {
      rating: this.ratting,
      productId: this.P_id,
      userId: this.userId,
      review: this.reviewForm.controls['review'].value,
    };

    console.log(review);

    try {
      const result = await this.prodService.addProductReview(review);
      console.log(result);
      this.tost.success('Your Review Submitted!!');
      this.reviewForm.reset();
      await this.fetchProductsReviews();
      await this.getUserReview();
    } catch (error) {
      this.tost.error('something went wrong!!');
    }
  }

  getRatingValue(rating: any) {
    this.ratting = rating;
  }

  checkLogin() {
    const userLocalDetail = localStorage.getItem('userDetail');
    // console.log(userLocalDetail);
    if (userLocalDetail === null) {
      this.tost.info('You Need To Login First!!');
      this.route.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  async addToCart(addCartData: any) {
    const isLogin = this.checkLogin();
    console.log(addCartData);

    if (this.isAdded) {
      this.route.navigateByUrl('/cart');
      return;
    }

    if (isLogin) {
      try {
        if (this.selectedSize == '' || this.selectedColorId == 0) {
          this.tost.info('Please Select Size and Color!!');
        } else {
          const result = await this.authService.addToCart(addCartData);
          console.log(result);
          this.tost.success('Product Added To Cart');
          this.isAdded = true;
        }
      } catch (error: any) {
        this.tost.info(error.error);
      }
    }
  }

  addColor(color_id: any) {
    console.log(typeof color_id);
    this.selectedColorId = color_id;
  }

  addSize(sz: any) {
    this.selectedSize = sz;
    console.log(this.selectedSize);
  }

  async fetchUserCart() {
    try {
      const result = await this.authService.getUserCart(this.userId);
      this.cartData = result;
      this.isAdded = this.cartData.some((e: any) => e.product_id == this.P_id);
      console.log(this.isAdded);
    } catch (error) {
      this.tost.error(' Error fetching cart data');
    }
  }

  async getUserReview() {
    try {
      const result = await this.prodService.getUsersReview({
        productId: this.P_id,
        userId: this.userId,
      });
      this.singleUserReview = result;
      console.log(result);
    } catch (error) {
      this.tost.error('Error fetching review data');
    }
  }

  async delReviewOfUser(review_id: any) {
    try {
      // console.log(review_id);
      const result = await this.prodService.delProdReview(review_id);
      this.tost.success('Review Deleted');
      this.getUserReview();
    } catch (error) {}
  }
}
