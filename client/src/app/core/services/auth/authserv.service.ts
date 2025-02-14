import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthservService {
  private readonly url = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}

  //user login
  userLogin(loginData: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.url}/auth/login`, loginData));
  }

  //user registration
  userRegis(regData: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.url}/auth/register`, regData));
  }

  //get single user by id
  getUserById(id: any): Promise<any> {
    return lastValueFrom(this.http.get(`${this.url}/user/${id}`));
  }

  //send email to user
  userSendMail(email: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.url}/auth/forgot`, email));
  }

  //reset password
  userResetPass(resetData: any): Promise<any> {
    return lastValueFrom(
      this.http.patch(`${this.url}/auth/reset/${resetData.token}`, resetData)
    );
  }

  //fetch products
  fetchProducts(): Promise<any> {
    return lastValueFrom(this.http.get('https://fakestoreapi.com/products'));
  }

  //add to cart
  addToCart(addCartData: any): Promise<any> {
    return lastValueFrom(
      this.http.post(`${this.url}/user/addCart`, addCartData)
    );
  }

  //get single user cart
  getUserCart(id: any): Promise<any> {
    return lastValueFrom(this.http.get(`${this.url}/user/getCart/${id}`));
  }

  //delete item from cart
  userDelFromCart(id: any): Promise<any> {
    return lastValueFrom(this.http.delete(`${this.url}/user/delCart/${id}`));
  }

  //update quantity from cart
  updateCartQuantity(updateCartData: any): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.url}/user/updtQnty`, updateCartData)
    );
  }

  //update users profile
  updateProfile(profileData: any): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.url}/user/updatePic`, profileData)
    );
  }

  //update users profile
  updateUsersProfile(updatedData: any): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.url}/auth/updateProfile`, updatedData)
    );
  }

  //check password
  checkPass(passData: any): Promise<any> {
    return lastValueFrom(
      this.http.get(
        `${this.url}/auth/checkPass/${passData?.user_id}/${passData?.password}`
      )
    );
  }

  //update users password
  updatePass(updatePassData: any): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.url}/auth/updatePass`, updatePassData)
    );
  }

  //fetch users address
  fetchUsersAddress(id: any): Promise<any> {
    return lastValueFrom(this.http.get(`${this.url}/user/getAddress/${id}`));
  }

  //delete users address
  delUsersAddress(id: any): Promise<any> {
    return lastValueFrom(this.http.delete(`${this.url}/user/delAddress/${id}`));
  }

  //add users address
  addUsersAddress(userAddressData: any): Promise<any> {
    console.log(userAddressData);

    return lastValueFrom(
      this.http.post(`${this.url}/user/addAddress`, userAddressData)
    );
  }

  // check if products already added in cart or not??
  checkCartProd(checkData: any): Promise<any> {
    return lastValueFrom(
      this.http.post(`${this.url}/user/checkCart`, checkData)
    );
  }

  placeOrder(orderData: any): Promise<any> {
    return lastValueFrom(
      this.http.post(`${this.url}/user/addorder`, orderData)
    );
  }

  getUsersOrde(user_id: any): Promise<any> {
    return lastValueFrom(
      this.http.get(`${this.url}/user/getUserOrder/${user_id}`)
    );
  }

  getUsersOrderProd(order_id: any): Promise<any> {
    return lastValueFrom(
      this.http.get(`${this.url}/user/getUserOrderProd/${order_id}`)
    );
  }

  cancleUserOrder(cancleOrdData: any): Promise<any> {
    return lastValueFrom(
      this.http.post(`${this.url}/user/delUserOrder`, cancleOrdData)
    );
  }

  getAllSellerOrders(seller_id: any): Promise<any> {
    return lastValueFrom(
      this.http.get(`${this.url}/user/seller/getOrder/${seller_id}`)
    );
  }

  getSellerSingleOrder(order_id: any): Promise<any> {
    return lastValueFrom(
      this.http.get(`${this.url}/user/seller/getSinlgeOrder/${order_id}`)
    );
  }

  getSellersFillterdOrdrByStatus(status: any): Promise<any> {
    return lastValueFrom(
      this.http.get(`${this.url}/user/seller/filterOrder/status/${status}`)
    );
  }

  getSellersFillterdOrdrByTime(diff: any): Promise<any> {
    return lastValueFrom(
      this.http.get(`${this.url}/user/seller/filterOrder/time/${diff}`)
    );
  }

  onOffEventSchedular(): Promise<any> {
    return lastValueFrom(
      this.http.post(`${this.url}/user/seller/onoffschedule`, null)
    );
  }
}
