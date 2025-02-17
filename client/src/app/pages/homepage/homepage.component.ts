import { Component, inject, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ProdCartComponent } from '../../shared/components/prodCart/prod-cart/prod-cart.component';
import { ProdsevService } from '../../core/services/product/prodsev.service';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, ProdCartComponent,RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  prodService = inject(ProdsevService);
  recentProdData: any = [];
  sharedData: any = [];

  ngOnInit() {
    const localData: any = localStorage.getItem('userDetail');
    const jsonData = JSON.parse(localData);
    const role = jsonData?.role;
    this.getAllProduct();
  }

  async getAllProduct() {
    try {
      const result = await this.prodService.getAllProd();
      this.recentProdData = result.slice(-6, -1);
      // console.log(this.recentProdData);
      this.recentProdData.map((item: any, index: any) => {
        this.sharedData.push({
          id: item.product_id,
          name: item.title,
          description: item?.description,
          image: item?.image,
          rating: 3,
        });
      });
      console.log(this.sharedData);
    } catch (error) {
      console.log(error);
    }
  }
}
