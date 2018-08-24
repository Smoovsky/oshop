import { OrderService } from 'shared/services/order.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {
  orders$;

  constructor(
    private auth: AngularFireAuth,
    private orderService: OrderService
  ) {
    auth.authState.subscribe(user => {
      this.orders$ = this.orderService.getOrderByCustomer(user.uid);
    }
    );
  }
}
