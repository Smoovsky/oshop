import { Observable } from 'rxjs';
import { OrderService } from '../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$: Observable<any>;

  constructor(
    private orderService: OrderService
  ) {
    this.orders$ = orderService.getAll();
   }
}
