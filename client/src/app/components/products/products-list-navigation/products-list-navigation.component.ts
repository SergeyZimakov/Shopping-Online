import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesListService } from 'src/app/services/categoriesList/categories-list.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-products-list-navigation',
  templateUrl: './products-list-navigation.component.html',
  styleUrls: ['./products-list-navigation.component.css']
})
export class ProductsListNavigationComponent implements OnInit {
  categoriesList: String[] = [];
  activeLink: string = 'link';

  constructor(
    private categoriesListService: CategoriesListService,
    ) { }

  ngOnInit(): void {
    this.categoriesListService.getCategoriesList().subscribe(list => this.categoriesList = list);
  }
  

}
