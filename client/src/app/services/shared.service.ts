import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  searchValue: string = '';

  private subjectHeader = new Subject<any>();
  private subjectCart = new Subject<any>();
  private subjectSearch = new Subject<any>();
  
  sendComponentUpdateEvent() {
    this.subjectHeader.next();
  }

  getComponentUpdateEvent(): Observable<any> {
    return this.subjectHeader.asObservable();
  }

  sendCartUpdateEvent() {
    this.subjectCart.next();
  }

  getCartUpdateEvent(): Observable<any> {
    return this.subjectCart.asObservable();
  }

  sendSearchInCartEvent(searchValue: string) {
    this.searchValue = searchValue;
    this.subjectSearch.next();
  }

  getSearchInCartEvent() {
    return this.subjectSearch.asObservable();
  }

  getSearchInCartValue() {
    return this.searchValue;
  }

  
}
