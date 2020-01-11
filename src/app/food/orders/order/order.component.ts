import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { OrderService } from 'src/app/shared/order.service';
import { Customer } from 'src/app/shared/customer.model';
import { CustomerService } from 'src/app/shared/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: ['./food.component.css']
})
export class OrderComponent implements OnInit {
  customerList: Customer[];
  isValid: boolean;

    constructor(private service: OrderService,
                private dialog: MatDialog,
                private customerService: CustomerService,
                private router: Router,
                private currentRoute: ActivatedRoute ) { }

    ngOnInit() {
      this.isValid = true;
      const orderID = this.currentRoute.snapshot.paramMap.get('id');
      if (orderID === null) {
        this.resetForm();
      } else {
        // tslint:disable-next-line: radix
        this.service.getOrderByID(parseInt(orderID)).then(res => {
          this.service.formData = {
                OrderID: res.OrderID,
                OrderNo: res.OrderNo,
                CustomerID: res.CustomerID,
                PMethod: res.PMethod,
                GTotal: res.GTotal,
                CustomerName: '',
                DeletedOrderItemIDs: ''
          };
          this.service.orderItems = res.OrderItems;
        });
      }
      this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
    }
    resetForm(form?: NgForm) {
      if (form != null) {
        form.resetForm();
      }
      this.service.formData = {
        OrderID: 0,
        OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
        CustomerID: 0,
        PMethod: '',
        GTotal: 0,
        CustomerName: '',
        DeletedOrderItemIDs: ''
      };
      this.service.orderItems = [];
    }

    AddOrEditOrderItem(orderItemIndex, OrderID) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = '50%';
      dialogConfig.data = { orderItemIndex, OrderID };
      this.dialog.open(OrderItemComponent, dialogConfig).afterClosed().subscribe(res => {
        this.updateGrandTotal();
      });
    }

    onDeleteOrderItem(orderItemID: number, i: number) {
      if (orderItemID != null) {
        this.service.formData.DeletedOrderItemIDs += orderItemID + ',';
      }
      this.service.orderItems.splice(i, 1);
      this.updateGrandTotal();
    }

    updateGrandTotal() {
      this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
        return prev + curr.Total;
      }, 0);
      this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
    }

    validateForm() {
      this.isValid = true;
      if (this.service.formData.CustomerID === 0) {
        this.isValid = false;
      } else if (this.service.orderItems.length === 0) {
        this.isValid = false;
      }
      return this.isValid;
    }


    onSubmit(form: NgForm) {
      if (this.validateForm()) {
        this.service.saveOrUpdateOrder().subscribe(res => {
          this.resetForm();
          alert('Submitted Successfully!');
          this.router.navigate(['/food/orders']);
        });
      }
    }
}
