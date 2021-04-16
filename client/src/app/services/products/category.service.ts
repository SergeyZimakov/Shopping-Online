import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  emptyProduct: Product = {
    _id: '',
    name: '',
    price: 0,
    img: ''
}
  constructor(private http: HttpClient) { }

  getEmptyProduct() {
    return this.emptyProduct;
  }
  getCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/products/category/${category}`);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`/api/products/id/${productId}`);
  }

  searchByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/products/name/${name}`);
  }
}
