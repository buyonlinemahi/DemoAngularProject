import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { FoodComponent } from './food/food.component';
import { OrdersComponent } from './food/orders/orders.component';
import { OrderComponent } from './food/orders/order/order.component';

const routes: Routes = [
  { path: '', redirectTo: 'http://localhost:4200/user/login', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent}
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
  path: 'food', component: FoodComponent,
    children: [
      { path : 'orders', component: OrdersComponent },
      { path: 'order', children: [
        { path: '', component : OrderComponent },
        { path: 'edit/:id', component: OrderComponent }
        ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
