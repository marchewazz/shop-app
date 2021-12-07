import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { RegisterFormComponent } from './components/register-page/register-form/register-form/register-form.component';
import { ProductPreviewComponent } from './components/products-page/product-preview/product-preview.component';
import { SingleProductPageComponent } from './components/single-product-page/single-product-page.component';
import { SuppliersProductsPageComponent } from './components/suppliers-products-page/suppliers-products-page.component';
import { LoginFormComponent } from './components/login-page/login-form/login-form.component';
import { CartComponent } from './components/cart-component/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    ProductsPageComponent,
    MainPageComponent,
    RegisterFormComponent,
    ProductPreviewComponent,
    SingleProductPageComponent,
    SuppliersProductsPageComponent,
    LoginFormComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
