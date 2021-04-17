import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/products/category.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  updateEventSubscription: Subscription;
  productIdToUpdate: string = '';

  errors = [];

  name: string = '';
  price: string = '';
  category: string = '';
  image: any = null;
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private productsService: CategoryService,
    private route: ActivatedRoute
  )
  {
    this.form = this.fb.group({});
    this.updateEventSubscription = this.sharedService.getUpdateProductEvent().subscribe(() => {
      this.productIdToUpdate = this.sharedService.getProductIdToUpdate();
      this.productsService.getProductById(this.productIdToUpdate).subscribe(product => {
        this.name = product.name;
        this.price = product.price.toString();
      })
    })
  }

  ngOnInit(): void {
  }

  onNameSelected(event: any) {
    this.name = event.target.value;
  }
  onPriceSelected(event: any) {
    this.price = event.target.value;
  }
  onCategorySelected(event: any) {
    this.category = event.target.value;
  }

  onImageSelected(event: any) {
    this.image = event.target.files[0];
  }

  clearFields() {
    this.productIdToUpdate = '';
    this.name = '';
    this.price = '';
    this.category = '';
    this.image = '';
  }

  submitForm() {
    const url = this.productIdToUpdate ? `/api/products/update/${this.productIdToUpdate}` : `api/products`;
    if (!this.productIdToUpdate) {
      const newProductData = new FormData();
      newProductData.append('name', this.name);
      newProductData.append('price', this.price);
      newProductData.append('category', this.category);
      newProductData.append('image', this.image);
      this.http.post<any>(url, newProductData).subscribe(res => this.errorsHandler(res));  
    }
    else {
      this.http.post<any>(url, {name: this.name, price: this.price}).subscribe(res => this.errorsHandler(res));
    }
  }

  errorsHandler(res: any) {
    if (res.errors) {
      this.errors = res.errors
    }
    else {
      this.sharedService.sendUpdateListEvent();
      this.clearFields();
    }
  }

}
