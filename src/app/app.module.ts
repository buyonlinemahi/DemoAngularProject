import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './shared/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FoodComponent } from './food/food.component';
import { OrderComponent } from './food/orders/order/order.component';
import { OrderItemComponent } from './food/orders/order-item/order-item.component';
import { OrdersComponent } from './food/orders/orders.component';
import { OrderService } from './shared/order.service';
import { CustomerService } from './shared/customer.service';
import { ItemService } from './shared/item.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserComponent,
    HomeComponent,
    OrdersComponent,
    FoodComponent,
    OrderComponent,
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Reactive form are synchronous ,logic reside in the component
    HttpClientModule,
    FormsModule, // Template Driven Approach  are asynchronous, most of the logic is driven from the template
    BrowserAnimationsModule, // for PopUp npm install --save @angular/material @angular/cdk @angular/animations 7.1.0, 7.1.0,7.0.4
    MatDialogModule, // ng add @angular/material
    MatProgressSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  entryComponents: [OrderItemComponent],
  providers: [ CustomerService, ItemService, OrderService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
