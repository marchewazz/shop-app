import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page/login-page.component';
import { ProductsPageComponent } from './components/products-page/products-page/products-page.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'products', component: ProductsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
