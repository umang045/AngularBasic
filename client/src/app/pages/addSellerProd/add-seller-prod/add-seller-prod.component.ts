import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { ColorPickerModule } from 'ngx-color-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProdsevService } from '../../../core/services/product/prodsev.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-seller-prod',
  imports: [
    NzFormModule,
    MatSlideToggleModule,
    CommonModule,
    NzSelectModule,
    NzButtonModule,
    NzRadioModule,
    NzModalModule,
    FormsModule,
    NzColorPickerModule,
    ColorPickerModule,
    NgMultiSelectDropDownModule,
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
  colors: any = [];
  selectedSizes: string[] = [];
  selectedColor: string = '#000000';

  selectedTag: string = '';
  selectedTagColor: string = '#000000';
  tagActive: boolean = false;
  tagOptions: string[] = ['Coming Soon', 'Featured'];

  // listOfOption = ['Option 01', 'Option 02'];
  listOfOption = ['Coming Soon', 'Featured', 'Popular', 'Best Seller'];
  // defaultOption = [...this.listOfSelectedValue];
  selectedValue = 'Default';
  newTag: string = '';

  isVisible = false;
  isOkLoading = false;

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    category_id: new FormControl(0, [Validators.required]),
    image: new FormControl(''),
    seller_id: new FormControl(''),
    product_id: new FormControl(null),
    colors: new FormControl([]),
    size: new FormControl([]),
    product_tag: new FormControl(''),
    product_tag_color: new FormControl(''),
    tag_active: new FormControl(false),
  });

  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  addNewTag(): void {
    this.listOfOption.push(this.newTag);
    this.newTag = '';

    console.log(this.listOfOption);
  }

  removeTag(tag: string): void {
    this.listOfOption = this.listOfOption.filter((t) => t !== tag);
  }

  sizeOptions: any = [];
  dropdownSettings = {};
  selectedItems: any = [];
  ngOnInit() {
    this.getUserId();
    this.fetchProdById();
    // console.log(this.productForm.controls['seller_id'].value);
    // console.log(this.uploadedImgId);
    // console.log(this.P_id);

    this.sizeOptions = [
      { item_id: 1, item_text: 'M' },
      { item_id: 2, item_text: 'S' },
      { item_id: 3, item_text: 'L' },
      { item_id: 4, item_text: 'XL' },
      { item_id: 5, item_text: 'XXL' },
    ]; // Options for the sizes dropdown

    this.dropdownSettings = {
      singleSelection: false, // Allow multiple selection
      idField: 'item_id', // Field that identifies each item
      textField: 'item_text', // Field that is displayed in the dropdown
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true, // Enable search filter
    };
  }

  onSelectSize(event: any) {
    this.selectedItems.push(event?.item_text);
    this.productForm.controls['size'].setValue(this.selectedItems);
    console.log(this.selectedItems);
  }

  // Event handler when size is deselected
  onDeSelectSize(event: any) {
    // console.log('Deselected Sizes: ', event);
    this.selectedItems = this.selectedItems.filter(
      (s: any) => s != event?.item_text
    );
    this.productForm.controls['size'].setValue(this.selectedItems);
  }
  onColorChange(color: any): void {
    console.log(color);
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
        this.productForm.controls['product_tag'].setValue(
          productData[0]?.product_tag
        );
        this.productForm.controls['product_tag_color'].setValue(
          productData[0]?.product_tag_color
        );
        this.productForm.controls['tag_active'].setValue(
          productData[0]?.tag_active
        );
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
    this.productForm.controls['colors'].setValue(this.colors);
    console.log(this.productForm.getRawValue());
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
      // this.toast.error('Something Went Wrong');
    }
  }

  addColor(color: any) {
    this.selectedColor = color;
    if (
      this.selectedColor &&
      !this.colors.includes(this.selectedColor) &&
      this.colors.length < 5
    ) {
      this.colors.push(this.selectedColor);
      this.selectedColor = '';
    }
    console.log(this.selectedColor);
    console.log(this.colors);
  }

  removeColor(color: string) {
    this.colors = this.colors.filter((c: any) => c !== color);
  }

  onTagSearch(search: string) {
    // If you want to add a new tag to the options when it's not found
    if (search && !this.tagOptions.includes(search)) {
      this.tagOptions = [...this.tagOptions, search];
    }
  }

  onTagOpenChange(open: boolean) {
    if (!open) {
      // When the dropdown closes, set the selected tag to the form control
      this.productForm.controls['product_tag'].setValue(this.selectedTag);
    }
  }

  onTagColorChange(color: string) {
    this.selectedTagColor = color;
    this.productForm.controls['product_tag_color'].setValue(color);
  }
}
