import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesListService {
  // list = [];
  // res: any = '';
  constructor(private http: HttpClient) { }

  getCategoriesList(): Observable<String[]> {
    // this.res = this.http.get<any>('http://localhost:8080/api/products/categorieslist');
    const res = this.http.get<String[]>('http://localhost:8080/api/products/categorieslist');
    
    return this.http.get<String[]>('http://localhost:8080/api/products/categorieslist');
    // console.log(this.res);
    
    // this.list = this.res.data;
    
    // return this.list;
  }
}

export interface CategoryItem {
  data: string;
}
