import { Cart } from '../../../models/Cart';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  @Input('cart') cart: Cart;

  constructor() { }

  ngOnInit() {
  }

}
