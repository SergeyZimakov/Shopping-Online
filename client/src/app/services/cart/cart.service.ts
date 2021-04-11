import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  emptyCart: Cart = {
    _id: '',
    userId: '',
    createdAt: '',
    status: '',
    items: [],
    price: 0,
}
  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) { }

  getEmptyCart() {
    return this.emptyCart;
  }

  getCartById(cartId: string): Observable<any> {
    return this.http.get<any>(`/api/carts/id/${cartId}`);
  }

  getCartShortInfoById(cartId: string): Observable<any> {
    return this.http.get<any>(`/api/carts/cartShortInfo/${cartId}`);
  }

  attachCartToSession(lastCartId?: string): Observable<any> {
    const userId = this.cookiesService.get('userId');
    return lastCartId ? this.http.get<any>(`/api/carts/id/${lastCartId}`) : this.http.post<any>(`/api/carts/createNewCart`, {userId});
  }

  addItemToCart(data: object) {
    return this.http.post('/api/carts/addItem', data);
  }

  deleteItemFromCart(itemId: string) {
    const cartId = this.cookiesService.get('cartId');
    const options = {
      headers: {},
      body: {
        cartId,
        itemId
      }
    }
    return this.http.delete('/api/carts/deleteItem', options);
  }
  clearAllItemsFromCart () {
    const cartId = this.cookiesService.get('cartId');
    const options = {
      headers: {},
      body: {
        cartId,
      }
    }
    return this.http.delete('/api/carts/clearCart', options);
  }
}
