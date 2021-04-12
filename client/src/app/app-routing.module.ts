import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsListCategoryComponent } from './components/products/products-list-category/products-list-category.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProductsMainComponent } from './components/products/products-main/products-main.component';
import { OrderMainComponent } from './components/orders/order-main/order-main.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsMainComponent,
    children: [
      {path: '', component: ProductsListCategoryComponent},
      {path: ':categoryName', component: ProductsListCategoryComponent}
    ]
  },
  {path: 'order', component: OrderMainComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }