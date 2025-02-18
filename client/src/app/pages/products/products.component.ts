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
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { TruncatePipePipe } from '../../shared/pipe/truncate/truncate-pipe.pipe';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-products',
  imports: [
    NgFor,
    NgxStarsModule,
    NzResultModule,
    TruncatePipePipe,
    NzPaginationModule,
    CommonModule,
    FormsModule,
    NzRateModule,
    NzSliderModule,
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
  categoriesData: any = [];

  userId: any;
  currentPage = 1;
  pageSize = 8;

  dbMinVal: number = 0;
  dbMaxVal: number = 0;

  selectedCategoryId: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedColorId: number | null = null;
  sortOption: any = null;

  heartIcons = {
    empty: '../assets/heart-empty.svg',
    half: '../assets/heart-half.svg',
    full: '../assets/heart-full.svg',
  };

  ngOnInit() {
    this.getAllProducts();
    this.getProducts();
    this.getUserId();
    this.getAllColors();
    this.getAllCategory();
    this.getPrice();
    this.getFilterProducts();
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
      // console.log(typeof result[0]?.avg_rating);

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

  async getAllCategory() {
    try {
      const result = await this.prodService.getAllCategory();
      this.categoriesData = result;
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async getPrice() {
    try {
      const result = await this.prodService.getPrice();
      this.dbMinVal = result[0]?.minPrice;
      this.dbMaxVal = result[0]?.maxPrice;
      // console.log(this.minPrice, this.maxPrice);
    } catch (error) {
      console.log(error);
    }
  }

  async getFilterProducts() {
    try {
      const result = await this.prodService.getFiltersProduct(
        this.selectedCategoryId,
        this.minPrice,
        this.maxPrice,
        this.selectedColorId,
        this.sortOption
      );
      this.dbProduct = result;
    } catch (error) {
      console.log(error);
    }
  }

  async handlePriceChange(event: any) {
    const inputValue = event;
    this.minPrice = inputValue;
    await this.getFilterProducts();
  }

  async handleColorChange(colorId: any) {
    this.selectedColorId == colorId
      ? (this.selectedColorId = null)
      : (this.selectedColorId = colorId);
    await this.getFilterProducts();
  }

  async handleCategory(categoryId: any) {
    this.selectedCategoryId == categoryId
      ? (this.selectedCategoryId = null)
      : (this.selectedCategoryId = categoryId);
    await this.getFilterProducts();

    // console.log(this.selectedCategoryId);
  }

  async handleSortFilter(event: any) {
    // console.log(event?.target?.value);
    const sortVal = event?.target?.value;
    this.sortOption = sortVal;
    await this.getFilterProducts();
    // console.log(this.sortOption);
  }
  convertToNumber(value: any): number {
    return Number.parseInt(value, 10);
  }
}
