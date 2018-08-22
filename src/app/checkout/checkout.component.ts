import { Cart } from 'shared/models/Cart';
import { Router } from '@angular/router';
import { Order } from 'shared/models/Order';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {}

    async ngOnInit() {
      this.cart$ = await this.shoppingCartService.getCart();
    }
  }

