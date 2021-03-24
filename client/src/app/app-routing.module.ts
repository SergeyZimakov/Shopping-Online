import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsListCategoryComponent } from './components/products/products-list-category/products-list-category.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/users/register/register.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
    children: [
      {path: '', component: ProductsListCategoryComponent},
      {path: ':categoryName', component: ProductsListCategoryComponent}
    ]
  },
  {path: 'home', component: HomePageComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }