import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthservService {
  private readonly url = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}

  userLogin(loginData: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.url}/auth/login`, loginData));
  }

  userRegis(regData: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.url}/auth/register`, regData));
  }

  getUserById(id: any): Promise<any> {
    return lastValueFrom(this.http.get(`${this.url}/user/${id}`));
  }

  userSendMail(email: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.url}/auth/forgot`, email));
  }

  userResetPass(resetData: any): Promise<any> {
    return lastValueFrom(
      this.http.patch(`${this.url}/auth/reset/${resetData.token}`, resetData)
    );
  }

  fetchProducts(): Promise<any> {
    return lastValueFrom(this.http.get('https://fakestoreapi.com/products'));
  }

  addToCart(addCartData: any): Promise<any> {
    return lastValueFrom(
      this.http.post(`${this.url}/user/addCart`, addCartData)
    );
  }

  getUserCart(id: any): Promise<any> {
    return lastValueFrom(this.http.get(`${this.url}/user/getCart/${id}`));
  }

  userDelFromCart(id: any): Promise<any> {
    return lastValueFrom(this.http.delete(`${this.url}/user/delCart/${id}`));
  }

  updateCartQuantity(updateCartData: any): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.url}/user/updtQnty`, updateCartData)
    );
  }

  updateProfile(profileData: any): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.url}/user/updatePic`, profileData)
    );
  }

  updateUsersProfile(updatedData: any): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.url}/auth/updateProfile`, updatedData)
    );
  }

  checkPass(passData: any): Promise<any> {
    return lastValueFrom(
      this.http.get(
        `${this.url}/auth/checkPass/${passData?.user_id}/${passData?.password}`
      )
    );
  }

  updatePass(updatePassData: any): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.url}/auth/updatePass`, updatePassData)
    );
  }

  fetchUsersAddress(id: any): Promise<any> {
    return lastValueFrom(this.http.get(`${this.url}/user/getAddress/${id}`));
  }

  delUsersAddress(id: any): Promise<any> {
    return lastValueFrom(this.http.delete(`${this.url}/user/delAddress/${id}`));
  }

  addUsersAddress(userAddressData: any): Promise<any> {
    console.log(userAddressData);

    return lastValueFrom(
      this.http.post(`${this.url}/user/addAddress`, userAddressData)
    );
  }

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
}
