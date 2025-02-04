import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule, NgFor } from '@angular/common';
import { ProdsevService } from '../../../core/services/product/prodsev.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-seller-prod-list',
  imports: [
    NzModalModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzPaginationModule,
    NzTableModule,
    NzDividerModule,
    CommonModule,
    NgFor,
    NzIconModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './seller-prod-list.component.html',
  styleUrl: './seller-prod-list.component.css',
})
export class SellerProdListComponent {
  prodService = inject(ProdsevService);
  router = inject(Router);
  toast = inject(ToastrService);
  userId: any;
  searchInput: any = '';
  page: any = 1;
  pageLimit: any;
  sellerData: any = [];
  pageSize = 5;
  total: any;

  showImg: any = '';

  isVisible = false;

  showModal(image: any): void {
    console.log(image);
    this.showImg = image;
    this.isVisible = true;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit() {
    this.getUserId();
    this.getProdList();
    this.getFilterdData();
    // console.log();
  }

  handleRoute(id: any) {
    this.router.navigateByUrl(`/seller/addProd/${id}`);
  }

  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
  }

  async getProdList() {
    try {
      const result = await this.prodService.fetchProdBySeller(this.userId);
      this.pageLimit = Math.round(result.length / 5 + 1);
      // console.log(Math.round(result.length / 5 + 1));

      this.total = result.length;
    } catch (error) {
      console.log(error);
    }
  }

  async handleDeleteProd(id: any) {
    try {
      if (confirm('Are You Sure??')) {
        const result = await this.prodService.delProdu(id);
        this.getProdList();
        this.toast.success('Product Deleted Succesfully');
      } else {
        console.log('Reva Dyo ');
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleSearch(value: string): void {
    console.log(value);
    this.searchInput = value;
    this.getFilterdData();
  }

  getFilterdData() {
    const obj = {
      search: this.searchInput,
      page: this.page,
      seller_id: this.userId,
    };

    try {
      this.prodService.searchPaginate(obj).subscribe(
        (data) => {
          this.sellerData = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  onPageChange(page: number): void {
    this.page = page;
    console.log(page);
    this.getFilterdData();
  }
}
