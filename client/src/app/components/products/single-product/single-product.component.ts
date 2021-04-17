import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() product = {
    _id: '',
    price: 0,
    img: '',
    name: ''
  };
  quantity:number = 1;
  cartId = '';
  quantityPopUpWindowStyle = 'quantityPopUpWindow hide';
  userRole = '';
  constructor(
    private cookieService: CookieService,
    private cartsService: CartService,
    private sharedService: SharedService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.cartId = this.cookieService.get('cartId');
    this.usersService.defineCurrentUser().subscribe(user => this.userRole = user.role);
  }

  increaseQuantity() {
    this.quantity ++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity --;
    }
  }
  quantityPopUpWindowToggle() {
    this.quantityPopUpWindowStyle = this.quantityPopUpWindowStyle === 'quantityPopUpWindow hide' ? 'quantityPopUpWindow show' : 'quantityPopUpWindow hide'
  }
  
  onAddProductToCart() {
    this.cartsService.addItemToCart({cartId: this.cartId, productId: this.product._id, quantity: this.quantity}).subscribe(res => {
      console.log(res);
      this.sharedService.sendCartUpdateEvent();
    });
    this.quantityPopUpWindowToggle();
  }

  onProductClicked() {
    if (this.userRole === 'admin') {
      this.sharedService.sendUpdateProductEvent(this.product._id);
    }
    else {
      this.quantityPopUpWindowToggle();
    }
  }

}
