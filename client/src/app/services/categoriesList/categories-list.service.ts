import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesListService {
  
  constructor(private http: HttpClient) { }

  getCategoriesList(): Observable<String[]> {
    return this.http.get<String[]>('http://localhost:8080/api/products/categorieslist');
  }
}

export interface CategoryItem {
  data: string;
}
