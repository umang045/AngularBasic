import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxStarsModule } from 'ngx-stars';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ProdsevService } from '../../../../core/services/product/prodsev.service';
import { TruncatePipePipe } from '../../../pipe/truncate/truncate-pipe.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prod-cart',
  imports: [
    CommonModule,
    FormsModule,
    TruncatePipePipe,
    NzRateModule,
    NgxStarsModule,
    RouterLink
  ],
  templateUrl: './prod-cart.component.html',
  styleUrl: './prod-cart.component.css',
})
export class ProdCartComponent {
  prodService = inject(ProdsevService);
  recentProdData: any;
  @Input() productData: any;

  ngOnInit() {
    this.getAllProduct();
    console.log(this.productData);
  }
  async getAllProduct() {
    try {
      const result = await this.prodService.getAllProd();
      this.recentProdData = result.slice(-6, -1);
      console.log(this.recentProdData);
    } catch (error) {
      console.log(error);
    }
  }
}
