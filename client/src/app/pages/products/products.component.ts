import { Component, inject } from '@angular/core';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ProdsevService } from '../../core/services/product/prodsev.service';
import { ToastrService } from 'ngx-toastr';
import { NgxStarsModule } from 'ngx-stars';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [
    NgFor,
    NgxStarsModule,
    NzPaginationModule,
    CommonModule,
    FormsModule,
    NzRateModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  authService = inject(AuthservService);
  prodService = inject(ProdsevService);
  tost = inject(ToastrService);
  http = inject(HttpClient);
  route = inject(Router);
  product: any = [];
  dbProduct: any = [];
  colorData: any = [];

  userId: any;
  currentPage = 1;
  pageSize = 8;

  heartIcons = {
    empty: '../assets/heart-empty.svg',
    half: '../assets/heart-half.svg',
    full: '../assets/heart-full.svg',
  };

  ngOnInit() {
    this.getAllProducts();
    this.getProducts();
    this.getUserId();
    this.getAllColors()
  }

  async getAllProducts() {
    try {
      const result = await this.authService.fetchProducts();
      this.product = result;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts() {
    try {
      const result = await this.prodService.getAllProd();
      this.dbProduct = result;
      console.log(result);

      console.log(result);
    } catch (error) {
      console.error('something went wrong');
    }
  }

  handleRoute(id: any) {
    this.route.navigateByUrl(`/product/${id}`);
  }

  checkLogin() {
    const userLocalDetail = localStorage.getItem('userDetail');
    if (userLocalDetail === null) {
      this.tost.info('You Need To Login First!!');
      this.route.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
  }

  getRatingValue(rating: any) {
    console.log(rating);
    const rt = Number.parseFloat(rating);
    console.log(typeof rt, rt);
  }

  onPageChange(pageNum: any) {
    this.currentPage = pageNum;
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dbProduct.slice(startIndex, endIndex);
  }

  async getAllColors() {
    try {
      const result = await this.prodService.getAllColors();
      this.colorData = result;
    } catch (error) {
      console.log(error);
    }
  }
}
