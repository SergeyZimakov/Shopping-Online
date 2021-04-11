import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subjectHeader = new Subject<any>();
  private subjectCart = new Subject<any>();
  
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

  
}
