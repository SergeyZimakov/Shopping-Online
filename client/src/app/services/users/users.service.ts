import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  emptyUser: User = {
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
    carts: [],
  };

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService,
  ) { }
  
  defineCurrentUser(): Observable<User> {
    const userId = this.cookiesService.get('userId') ? this.cookiesService.get('userId') : 'null';
    const user = this.http.get<User>(`/api/users/user/${userId}`);
    return user;
  }

  logInHandle(data: object): Observable<User> {
    const loggedInUser = this.http.post<User>('/api/users/login', data);
    return loggedInUser;
  }

  logOutHandle(): User {
    this.http.post('/api/users/logout', {}).subscribe();
    return this.emptyUser;
  }
  
}

