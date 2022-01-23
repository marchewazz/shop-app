import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

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
import { ShippingPageComponent } from './components/shipping-page/shipping-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ConfirmedBankAuthPageComponent } from './components/confirmed-bank-auth-page/confirmed-bank-auth-page.component';
import { OrdersPreviewComponent } from './components/profile-page/orders-preview/orders-preview.component';
import { CommentsSectionComponent } from './components/single-product-page/comments-section/comments-section.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { AddListFormComponent } from './components/add-list-form/add-list-form.component';


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
    ShippingPageComponent,
    ProfilePageComponent,
    ConfirmedBankAuthPageComponent,
    OrdersPreviewComponent,
    CommentsSectionComponent,
    ListPageComponent,
    AddListFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
