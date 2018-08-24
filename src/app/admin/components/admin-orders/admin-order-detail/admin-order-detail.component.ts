import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent {
  order$;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    const orderId = route.snapshot.paramMap.get('id');
    this.order$ = orderService.getOrder(orderId); // .subscribe(x => console.log(x) );
   }
}
