import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/services/cart/cart';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  btnEnable: boolean = true;
  currentCart: Cart;
  updateEventSubscription: Subscription;
  @Input() nameToMark: string = '';
  constructor(
    private cartService: CartService,
    private cookieService: CookieService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.currentCart = this.cartService.getEmptyCart();
    this.updateEventSubscription = this.sharedService.getCartUpdateEvent().subscribe(() => {
      this.cartService.getCartById(this.cookieService.get('cartId')).subscribe(res => this.currentCart = res.cart);
    });
    this.btnEnable = !this.router.url.endsWith('order');
  }
  
  ngOnInit(): void {
    this.cartService.getCartById(this.cookieService.get('cartId')).subscribe(res => this.currentCart = res.cart);    
  }

  passToOrder() {
    if (this.currentCart.items.length === 0) {
      alert('You do not have any product in your cart yet.\nPlease choose something before you make an order.\nThank you')
    }
    else {
      this.router.navigate(['/order']);
    }
  }
  
  backToShop() {
    this.router.navigate(['/products']);
  }

  onClearAllItemsFromCart() {
    this.cartService.clearAllItemsFromCart().subscribe(() => this.sharedService.sendCartUpdateEvent());
  }

}
