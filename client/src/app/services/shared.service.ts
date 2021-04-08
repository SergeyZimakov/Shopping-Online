import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();
  
  sendComponentUpdateEvent() {
    this.subject.next();
  }

  getComponentUpdateEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  
}
