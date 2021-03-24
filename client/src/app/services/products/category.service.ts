import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/api/products/category/${category}`);
  }
}
