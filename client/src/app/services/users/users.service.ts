import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  emptyUser = {
    _id: '',
    id: '',
    name: {
        first: '',
        second: '',
    },
    email: '',
    address: {
        city: '',
        street: '',
    },
    lastCartId: '',
  };

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService,
  ) { }
  
  defineCurrentUser(): Observable<any> {
    const userId = this.cookiesService.get('userId') ? this.cookiesService.get('userId') : 'null';
    const user = this.http.get<any>(`/api/users/user/${userId}`);
    return user;
  }

  getEmptyUser() {
    return this.emptyUser;
  }
  
  logInHandle(data: object): Observable<any> {
    const res = this.http.post<any>('/api/users/login', data);
    return res;
  }

  logOutHandle() {
    this.http.post('/api/users/logout', {}).subscribe();
    return this.emptyUser;
  }
  
}

