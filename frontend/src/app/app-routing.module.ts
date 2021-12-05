import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { SingleProductPageComponent } from './components/single-product-page/single-product-page.component';
import { SuppliersProductsPageComponent } from './components/suppliers-products-page/suppliers-products-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'products', component: ProductsPageComponent},
  { path: 'product/:id', component: SingleProductPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
