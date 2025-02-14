import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdsevService } from '../../../core/services/product/prodsev.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-review-list',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgStyle,
    NzIconModule,
    MatSlideToggleModule,
    NzDividerModule,
    NzTableModule,
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css',
})
export class ReviewListComponent {
  route = inject(ActivatedRoute);
  product_id: any;
  prodService = inject(ProdsevService);
  sellerReviewData: any = [];

  ngOnInit() {
    this.getProductId();
    this.getAllReviewsForSeller();
  }

  getProductId() {
    this.route.params.subscribe((data: any) => {
      this.product_id = data?.id;
    });
  }

  async getAllReviewsForSeller() {
    try {
      const result = await this.prodService.getReviwListSellr(this.product_id);
      this.sellerReviewData = result;
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async changeStatus(review_id: any) {
    // console.log(review_id);
    try {
      const result = await this.prodService.toogleReview(review_id);
      this.getAllReviewsForSeller();
    } catch (error) {
      console.log(error);
    }
  }
}
