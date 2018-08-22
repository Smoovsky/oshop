import { Cart } from '../../../models/Cart';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../../order.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../models/Order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: Cart;
  userId: string;
  subscription: Subscription = null;
  shipping = {};

  constructor(
    private orderServie: OrderService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const user$ = this.auth.user$;
    this.subscription = user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(f) {
    if (f.valid) {// console.log(this.shipping);
    const order = new Order(this.userId, this.shipping, this.cart);
    // {
    //   datePlaced: Date.now(),
    //   shipping: this.shipping,
    //   items: this.cart.itemsArray,
    //   userId: this.userId
    // };

    const result = await this.orderServie.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
   }
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
