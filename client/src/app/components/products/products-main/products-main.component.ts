import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/products/category.service';
import { Product } from 'src/app/services/products/product';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.css']
})
export class ProductsMainComponent implements OnInit {
  userRole: string = '';
  cartStyle = {
    width: '25%'
  };
  toggleIconClass = 'bi bi-arrow-right-circle-fill';
  @Input() nameToSearch: string = '';
  searchResults: Product[] = [];
  searchResultsAreHidden: boolean = true;
  constructor(
    private productsService: CategoryService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.defineCurrentUser().subscribe(user => this.userRole = user.role);
  }

  changeWidth() {
    this.cartStyle = this.cartStyle.width === '25%' ? {width: '40%'} : {width: '25%'};
    this.toggleIconClass = this.toggleIconClass === 'bi bi-arrow-right-circle-fill' ? 'bi bi-arrow-left-circle-fill' : 'bi bi-arrow-right-circle-fill'
  }
  searchByName() {
    this.searchResultsAreHidden = false;
    this.productsService.searchByName(this.nameToSearch).subscribe( list => this.searchResults = list);
  }
  hideSearchResults() {
    this.searchResultsAreHidden = true;
  }
  
}
