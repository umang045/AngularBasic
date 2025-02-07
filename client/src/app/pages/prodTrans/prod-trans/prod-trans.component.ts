import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProdsevService } from '../../../core/services/product/prodsev.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prod-trans',
  imports: [
    CommonModule,
    NzModalModule,
    NzIconModule,
    NzPaginationModule,
    NzTableModule,
  ],
  templateUrl: './prod-trans.component.html',
  styleUrl: './prod-trans.component.css',
})
export class ProdTransComponent {
  route = inject(Router);
  prodService = inject(ProdsevService);
  P_id: any = Number.parseInt(this.route.url.toString().split('/')[3]);
  transactionData: any = [];

  ngOnInit() {
    this.fetchTransaction();
  }

  async fetchTransaction() {
    try {
      const result = await this.prodService.getProdTrans(this.P_id);
      this.transactionData = result;
      console.log(this.transactionData);
    } catch (error) {
      console.log(error);
    }
  }
}
