import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  name: string = '';
  price: string = '';
  category: string = '';
  image: any = null;
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({})
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

  submitForm() {
    const newProductData = new FormData();
    newProductData.append('name', this.name);
    newProductData.append('price', this.price);
    newProductData.append('category', this.category);
    newProductData.append('image', this.image);
    this.http.post<any>('http://localhost:8080/api/products', newProductData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    );  
  }

}
