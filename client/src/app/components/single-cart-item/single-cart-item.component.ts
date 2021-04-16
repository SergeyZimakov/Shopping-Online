import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  searchInCartEventSubscription: Subscription;
  searchValue: string = '';
  nameClass: string = 'unmark'; 
  btnEnable: boolean;
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
    private sharedService: SharedService,
    private router: Router
  ) {
      this.product = this.productsService.getEmptyProduct();
      this.productsService.getProductById(this.cartItem.productId).subscribe(product => this.product = product);
      this.btnEnable = !this.router.url.endsWith('/order');
      this.searchInCartEventSubscription = this.sharedService.getSearchInCartEvent().subscribe(() => {
        this.searchValue = sharedService.getSearchInCartValue();
        if (this.product.name.toLowerCase().startsWith(this.searchValue.toLowerCase()) && this.searchValue !== '') {
          this.nameClass = 'mark';
        }
        else {
          this.nameClass = 'unmark';
        }
      });
    }

  ngOnInit(): void {
    this.productsService.getProductById(this.cartItem.productId).subscribe(product => this.product = product);
  }
  onDeleteItemFromCart () {
    this.cartService.deleteItemFromCart(this.cartItem._id).subscribe((res) => {
      this.sharedService.sendCartUpdateEvent();
      console.log(res);
      
    });
  }

  getNameClass() {
    if (this.product.name.startsWith(this.searchValue) && this.searchValue !== '') {
      return 'mark';
    }
    else {
      return 'unmark';
    }
  }

}
