import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) { }

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
}
