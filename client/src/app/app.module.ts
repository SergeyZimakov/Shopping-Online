import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNewProductComponent } from './components/products/add-new-product/add-new-product.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsListNavigationComponent } from './components/products/products-list-navigation/products-list-navigation.component';
import { ProductsListCategoryComponent } from './components/products/products-list-category/products-list-category.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPanelComponent } from './components/about-panel/about-panel.component';
import { InfoPanelComponent } from './components/info-panel/info-panel.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { CookieModule } from 'ngx-cookie';
import { CartComponent } from './components/cart/cart.component';
import { ProductsMainComponent } from './components/products/products-main/products-main.component';
import { SingleProductComponent } from './components/products/single-product/single-product.component';
import { HeaderComponent } from './components/header/header.component';
import { SingleCartItemComponent } from './components/single-cart-item/single-cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewProductComponent,
    ProductsListComponent,
    ProductsListNavigationComponent,
    ProductsListCategoryComponent,
    HomePageComponent,
    AboutPanelComponent,
    InfoPanelComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ProductsMainComponent,
    SingleProductComponent,
    HeaderComponent,
    SingleCartItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CookieModule.forRoot()
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
