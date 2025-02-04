import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProdsevService } from '../../../core/services/product/prodsev.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-seller-prod',
  imports: [
    NzFormModule,
    CommonModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzUploadModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-seller-prod.component.html',
  styleUrl: './add-seller-prod.component.css',
})
export class AddSellerProdComponent {
  seller_id: any;
  userId: any;
  prodService = inject(ProdsevService);
  uploadedImgUrl: any = '';
  uploadedImgId: any;
  toast = inject(ToastrService);
  route = inject(Router);
  P_id: any = Number.parseInt(this.route.url.toString().split('/')[3]);

  img: any = '';

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    category_id: new FormControl(0, [Validators.required]),
    size: new FormControl(null),
    image: new FormControl(''),
    seller_id: new FormControl(''),
    product_id: new FormControl(null),
  });

  ngOnInit() {
    this.getUserId();
    this.fetchProdById();
    console.log(this.productForm.controls['seller_id'].value);
    console.log(this.uploadedImgId);
    console.log(this.P_id);
  }

  getUserId() {
    const localData: any = localStorage.getItem('userDetail');
    const id = JSON.parse(localData);
    this.userId = id?.id;
    this.productForm.controls['seller_id'].setValue(this.userId);
  }

  async fetchProdById() {
    try {
      if (!Number.isNaN(this.P_id)) {
        const result: any = await this.prodService.getSingleProd(this.P_id);
        console.log(result[0]);
        const productData = result[0];
        console.log(productData);
        this.productForm.controls['title'].setValue(productData[0]?.title);
        this.productForm.controls['description'].setValue(
          productData[0]?.description
        );
        this.productForm.controls['price'].setValue(productData[0]?.price);
        this.productForm.controls['stock'].setValue(productData[0]?.stock);
        this.productForm.controls['image'].setValue(productData[0]?.image);
        this.productForm.controls['category_id'].setValue(
          productData[0]?.category_id
        );
        this.uploadedImgUrl = productData[0]?.image;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleFile(event: any) {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const selectedFiles = fileInput.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const fileToUpload = selectedFiles[0];
      console.log(fileToUpload);
      const formData = new FormData();

      if (this.uploadedImgId != undefined) {
        const result = await this.prodService.delProdImg(this.uploadedImgId);
        console.log(result);
      }
      formData.append('image', fileToUpload);
      const result = await this.prodService
        .uploadProdImg(formData)
        .then((rs) => {
          this.uploadedImgUrl = rs?.data?.url;
          this.productForm.controls['image'].setValue(this.uploadedImgUrl);
          this.uploadedImgId = rs?.data?.public_id;
          console.log(rs);
        });
      // this.productForm.controls['image'].setValue(this.uploadedImgUrl);
      // console.log(this.productForm.controls['image'].value);

      console.log(result);
      console.log(this.uploadedImgUrl);
      console.log(this.productForm.controls['image'].value);

      // this.pro
    }
  }

  handleCategory(event: any) {
    const category_id = Number.parseInt(event?.target?.value);
    // console.log(typeof category_id);
    this.productForm.controls['category_id'].setValue(category_id);
  }

  //handle submit form
  async submitProductForm() {
    // console.log(this.productForm.getRawValue());
    try {
      if (!Number.isNaN(this.P_id)) {
        this.productForm.controls['product_id'].setValue(this.P_id);
        const updateData = this.productForm.getRawValue();

        const result = await this.prodService.updateProd(updateData);
        this.toast.success('Product Updated Succesfully');
      } else {
        const prodData = this.productForm.getRawValue();
        const result = await this.prodService.addProd(prodData);
        this.toast.success('Product Added Succesfully');
      }
    } catch (error) {
      this.toast.error('Something Went Wrong');
    }
  }
}
