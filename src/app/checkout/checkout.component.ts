import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart = null;
  shipping = {};
  subscription: Subscription[];
  userId: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderServie: OrderService,
    private auth: AuthService
  ) {}

    placeOrder() {
      // console.log(this.shipping);
      const order = {
        datePlaced: Date.now(),
        shipping: this.shipping,
        items: this.cart.itemsArray,
        userId: this.userId
      };

      this.orderServie.storeOrder(order);
    }

    async ngOnInit() {
      const cart$ = await this.shoppingCartService.getCart();
      const user$ = this.auth.user$;
      this.subscription.push(cart$.subscribe(cart => this.cart = cart));
      this.subscription.push(user$.subscribe(user => this.userId = user.uid));
    }

    ngOnDestroy() {
      this.subscription.forEach( x => x.unsubscribe());
    }
  }

