import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];
  constructor(private http: HttpClient) { }
    headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    saveOrUpdateOrder() {
      const body = {
        ...this.formData,
        OrderItems: this.orderItems
      };
      return this.http.post(environment.apiURL + '/Order/PostOrder/{orderParam}', JSON.stringify(body), this.headers);
    }
    getOrderList(): any {
      return this.http.get(environment.apiURL + '/Order/GetAllOrders').toPromise();
    }

   getOrderByID(id: number): any {
      return this.http.get(environment.apiURL + '/Order/GetOrderAndOrderItem/' + id).toPromise();
    }

    deleteOrder(id: number ) {
      return this.http.delete(environment.apiURL + '/Order/DeleteOrder/' + id).toPromise();
    }
}

