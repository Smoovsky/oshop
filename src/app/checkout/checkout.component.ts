import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart = null;
  shipping = {};
  subscription: Subscription = null;
  /**
   *
   */
  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderServie: OrderService) {
  }

  placeOrder() {
    // console.log(this.shipping);
    const order = {
      datePlaced: Date.now(),
      shipping: this.shipping,
      items: this.cart.itemsArray,
    }
    console.log(order);
    
     this.orderServie.storeOrder(order).then(
       x => console.log(x);
       
     );
  }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
