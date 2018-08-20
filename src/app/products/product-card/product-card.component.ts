import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'models/product';
import { ShoppingCartService } from '../../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('showAction') showAction: Boolean = true;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }
}
