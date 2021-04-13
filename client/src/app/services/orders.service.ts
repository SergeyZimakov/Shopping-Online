import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  orderSubmit (data: any): Observable<any> {
    const { city, street, creditCard, date } = data;
    const userId = this.cookieService.get('userId');
    const cartId = this.cookieService.get('cartId');
    const order = {
      userId, cartId, city, street, creditCard, date
    }
    return this.http.post('/api/orders/', order);
  }

  downloadCheck(orderId: string): Observable<any> {
    return this.http.get(`/api/orders/download/${orderId}`);
  }

}
