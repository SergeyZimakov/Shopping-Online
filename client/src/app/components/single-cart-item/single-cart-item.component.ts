import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/products/category.service';
import { Product } from 'src/app/services/products/product';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-single-cart-item',
  templateUrl: './single-cart-item.component.html',
  styleUrls: ['./single-cart-item.component.css']
})
export class SingleCartItemComponent implements OnInit {
  @Input() cartItem = {
    _id: '',
    quantity: '',
    price: '',
    productId: ''
  };
  product: Product;
  constructor(
    private productsService: CategoryService,
    private cartService: CartService,
    private sharedService: SharedService
  ) { this.product = this.productsService.getEmptyProduct() }

  ngOnInit(): void {
    this.productsService.getProductById(this.cartItem.productId).subscribe(product => this.product = product);
  }
  onDeleteItemFromCart () {
    this.cartService.deleteItemFromCart(this.cartItem._id).subscribe((res) => {
      this.sharedService.sendCartUpdateEvent();
      console.log(res);
      
    });
  }

}
