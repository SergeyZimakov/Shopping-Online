import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/services/users/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: User = {
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
  @Input() email: string = '';
  @Input() password: string = '';
  constructor(
    private usersService: UsersService,
    private cookies: CookieService
  ) { }

  ngOnInit (): void {
    this.usersService.defineCurrentUser().subscribe(res => this.currentUser = res);
  }
  
  onLogInHandle() {
    this.usersService.logInHandle({email: this.email, password: this.password}).subscribe(res => {
      this.currentUser = res;
    });
  }
  onLogOutHandle() {
    this.currentUser = this.usersService.logOutHandle();
  }

  

}
