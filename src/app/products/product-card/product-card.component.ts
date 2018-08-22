import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from '../../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('showAction') showAction: Boolean = true;
  @Input('shoppingCart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  // getQuantity() {
  //   if (!this.shoppingCart) {
  //     return 0;
  //   }
  //   const item = this.shoppingCart.items[this.product.key];
  //   return item ? item.quantity : 0;
  // }
}
