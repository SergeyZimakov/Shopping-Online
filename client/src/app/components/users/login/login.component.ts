import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import { User } from 'src/app/services/users/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: User;
  cartShortInfo = {
    status: '',
    price: '',
    createdAt: ''
  };
  logInError: string = '';
  lastCartId: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  updateEventSubscription: Subscription;
  constructor(
    private usersService: UsersService,
    private cartService: CartService,
    private router: Router,
    private sharedService: SharedService
  ) {
      this.updateEventSubscription = this.sharedService.getComponentUpdateEvent().subscribe(() => {this.onLogOutHandle()});
      this.currentUser = this.usersService.getEmptyUser();
    }

  ngOnInit (): void {
    this.usersService.defineCurrentUser().subscribe(res => this.currentUser = res);
  }
  
  onLogInHandle() {
    this.usersService.logInHandle({email: this.email, password: this.password}).subscribe(res => {
      if(res.err) {
        this.logInError = res.err;
      }
      else {
        this.logInError = '';
        this.sharedService.sendComponentUpdateEvent();
        this.currentUser = res.user;
        if (res.user.lastCartId) {
          this.lastCartId = res.user.lastCartId;
          this.cartService.getCartShortInfoById(res.user.lastCartId).subscribe(res => this.cartShortInfo = res);
          this.cartService.attachCartToSession(res.user.lastCartId).subscribe();
        }
        else {
          this.cartShortInfo.status = 'new';
          this.cartService.attachCartToSession().subscribe();
        }
      }
    });
  }
  onLogOutHandle() {
    this.currentUser = this.usersService.getEmptyUser();
    // this.router.navigate(['/home']);
  }

  startShopping() {
    this.router.navigate(['/products']);
  }

}
