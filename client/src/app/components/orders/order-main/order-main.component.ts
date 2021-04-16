import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/products/category.service';
import { Product } from 'src/app/services/products/product';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.css']
})
export class OrderMainComponent implements OnInit {

  @Input() nameToMark: string = '';
  constructor(
    private productsService: CategoryService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  searchInCart() {
    this.sharedService.sendSearchInCartEvent(this.nameToMark);
  }

}
