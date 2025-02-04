import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdsevService {
  constructor(private http: HttpClient) {}

  private readonly url = 'http://localhost:8000/api';

  getAllProd(): Promise<any> {
    return lastValueFrom(this.http.get(this.url + '/product'));
  }

  getSingleProd(id: any): Promise<any> {
    return lastValueFrom(this.http.get(this.url + `/product/${id}`));
  }

  getProductReviews(id: any): Promise<any> {
    return lastValueFrom(this.http.get(this.url + `/product/review/${id}`));
  }

  addProductReview(reviewData: any): Promise<any> {
    return lastValueFrom(
      this.http.post(this.url + `/product/review`, reviewData)
    );
  }

  fetchProdBySeller(fetchData: any): Promise<any> {
    const res = lastValueFrom(
      this.http.get(this.url + `/product/sellerProd/${fetchData}`)
    );
    // console.log(res);
    return res;
  }

  uploadProdImg(img: any): Promise<any> {
    return lastValueFrom(
      this.http.post(this.url + `/product/image/upload`, img)
    );
  }

  delProdImg(id: any): Promise<any> {
    return lastValueFrom(
      this.http.delete(this.url + `/product/image/del/${id}`)
    );
  }

  addProd(productData: any): Promise<any> {
    console.log(typeof productData);

    return lastValueFrom(this.http.post(this.url + `/product/`, productData));
  }

  delProdu(id: any): Promise<any> {
    return lastValueFrom(this.http.delete(this.url + `/product/${id}`));
  }

  updateProd(updateData: any): Promise<any> {
    return lastValueFrom(this.http.put(this.url + `/product/`, updateData));
  }

  searchPaginate(serchData: any) {
    console.log(typeof serchData);
    return this.http.post(this.url + `/product/sellerProd/search`, serchData);
  }
}
