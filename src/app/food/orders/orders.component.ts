import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: ['./food.component.css']
})
export class OrdersComponent implements OnInit {
  orderArrayList;
  count: number;
  config;

  constructor(private service: OrderService,
              private router: Router) {
                this.refreshList();
                this.config = {
                  itemsPerPage: 2,
                  currentPage: 1,
                  totalItems: this.count
                };
              }

  ngOnInit() { }
  refreshList() {
  this.service.getOrderList().then(res => {
  this.orderArrayList = res.OrderLists;
  this.count = res.TotalCount;
  });
}

pageChanged(event) {
  this.config.currentPage = event;
}
  openForEdit(orderID: number) {
    this.router.navigate(['/food/order/edit/' + orderID]);

  }
  onOrderDelete(id: number) {
    if (confirm('Are you sure you want to delete this record ?')) {
      this.service.deleteOrder(id).then(res => {
        this.refreshList();
        alert('Deleted Successfully!');
      });
    }
  }

}
