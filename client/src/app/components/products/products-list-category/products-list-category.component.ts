import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesListService } from 'src/app/services/categoriesList/categories-list.service';
import { CategoryService } from 'src/app/services/products/category.service';
import { Product } from 'src/app/services/products/product';

@Component({
  selector: 'app-products-list-category',
  templateUrl: './products-list-category.component.html',
  styleUrls: ['./products-list-category.component.css']
})
export class ProductsListCategoryComponent implements OnInit {
  categoryName: string = '';
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private categoriesListService: CategoriesListService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.categoryName) {
        this.categoryService.getCategory(params.categoryName).subscribe(res => this.products = res);
      }
      else {
        this.categoriesListService.getCategoriesList().subscribe(res => this.router.navigate([`products/${res[0]}`])); 
      }
    });
  }
}
