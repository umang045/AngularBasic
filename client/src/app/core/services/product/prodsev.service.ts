import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdsevService {
  constructor(private http: HttpClient) {}

  private readonly url = 'http://localhost:8000/api';

  //get all products
  getAllProd(): Promise<any> {
    return lastValueFrom(this.http.get(this.url + '/product'));
  }

  //get single products
  getSingleProd(id: any): Promise<any> {
    return lastValueFrom(this.http.get(this.url + `/product/${id}`));
  }

  //get all products review
  getProductReviews(id: any): Promise<any> {
    return lastValueFrom(this.http.get(this.url + `/product/review/${id}`));
  }

  //add product reviews
  addProductReview(reviewData: any): Promise<any> {
    return lastValueFrom(
      this.http.post(this.url + `/product/review`, reviewData)
    );
  }

  //fetch product by seller id for seller
  fetchProdBySeller(fetchData: any): Promise<any> {
    const res = lastValueFrom(
      this.http.get(this.url + `/product/sellerProd/${fetchData}`)
    );
    // console.log(res);
    return res;
  }

  //upload Img to cloudinary
  uploadProdImg(img: any): Promise<any> {
    return lastValueFrom(
      this.http.post(this.url + `/product/image/upload`, img)
    );
  }

  //delete image from database and cloudinary
  delProdImg(id: any): Promise<any> {
    return lastValueFrom(
      this.http.delete(this.url + `/product/image/del/${id}`)
    );
  }

  //add seller product
  addProd(productData: any): Promise<any> {
    console.log(typeof productData);

    return lastValueFrom(this.http.post(this.url + `/product/`, productData));
  }

  //delete seller product
  delProdu(id: any): Promise<any> {
    return lastValueFrom(this.http.delete(this.url + `/product/${id}`));
  }

  //update seller products
  updateProd(updateData: any): Promise<any> {
    return lastValueFrom(this.http.put(this.url + `/product/`, updateData));
  }

  //search and apggination for seller module
  searchPaginate(serchData: any) {
    console.log(typeof serchData);
    return this.http.post(this.url + `/product/sellerProd/search`, serchData);
  }

  //get users review
  getUsersReview(getUsrRwData: any): Promise<any> {
    return lastValueFrom(
      this.http.post(this.url + `/product/getUserReview`, getUsrRwData)
    );
  }

  //delete users review
  delProdReview(review_id: any): Promise<any> {
    return lastValueFrom(
      this.http.delete(this.url + `/product/review/del/${review_id}`)
    );
  }

  //toogle product
  toogleProd(product_id: any): Promise<any> {
    return lastValueFrom(
      this.http.post(this.url + `/product/active/${product_id}`, null)
    );
  }

  //get Products transactions
  getProdTrans(product_id: any): Promise<any> {
    return lastValueFrom(
      this.http.get(this.url + `/product/getProdTrans/${product_id}`)
    );
  }

  getAllColors(): Promise<any> {
    return lastValueFrom(this.http.get(this.url + `/product/colors`));
  }

  getAllCategory(): Promise<any> {
    return lastValueFrom(this.http.get(this.url + `/product/category`));
  }

  getPrice(): Promise<any> {
    return lastValueFrom(this.http.get(this.url + `/product/price`));
  }

  getFiltersProduct(
    selectedCategoryId: number | null,
    minPrice: number | null,
    maxPrice: number | null,
    selectedColorId: number | null,
    sortOption: string
  ): Promise<any> {
    let params = new HttpParams();
    if (selectedCategoryId !== null) {
      params = params.set(
        'selected_category_id',
        selectedCategoryId.toString()
      );
    }
    if (minPrice !== null) {
      params = params.set('min_price', minPrice.toString());
    }
    if (maxPrice !== null) {
      params = params.set('max_price', maxPrice.toString());
    }
    if (selectedColorId !== null) {
      params = params.set('selected_color_id', selectedColorId.toString());
    }
    params = params.set('sort_option', sortOption);
    return lastValueFrom(
      this.http.get<any>(this.url + `/product/filter`, { params })
    );
  }

  getReviwListSellr(review_id: any): Promise<any> {
    return lastValueFrom(
      this.http.get(this.url + `/product/allReviews/${review_id}`)
    );
  }

  toogleReview(review_id: any): Promise<any> {
    return lastValueFrom(
      this.http.put(this.url + `/product/toogleReview/${review_id}`, null)
    );
  }
}
