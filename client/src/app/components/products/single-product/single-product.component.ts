import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/services/cart/cart.service';

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
  @Input() quantity = 1;
  cartId = '';
  quantityPopUpWindowStyle = 'quantityPopUpWindow hide';
  constructor(
    private cookieService: CookieService,
    private cartsService: CartService
  ) { }

  ngOnInit(): void {
    this.cartId = this.cookieService.get('cartId');
    
  }
  quantityPopUpWindowToggle() {
    this.quantityPopUpWindowStyle = this.quantityPopUpWindowStyle === 'quantityPopUpWindow hide' ? 'quantityPopUpWindow show' : 'quantityPopUpWindow hide'
  }
  
  addProductToCart() {
    const data = {
      cartId: this.cartId,
      productId: this.product._id,
      quantity: this.quantity,
      price: this.product.price * this.quantity
    }
    this.cartsService.addItemToCart(data).subscribe(res => console.log(res));
    
  }

}
