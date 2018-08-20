import { Cart } from './../models/Cart';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreate: new Date().getTime()
    });
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object<Cart>('/shopping-carts/' + cartId).valueChanges().pipe(map(x => new Cart(x.items)));
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private getItem(cartId, productId) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    this.updateCart(product, 1);
  }
  async removeFromCart(product: Product) {
    this.updateCart(product, -1);
  }

  private async updateCart(product, number) {
    const cartId = await this.getOrCreateCartId();

    const item$F = this.getItem(cartId, product.key);
    const item$ = item$F.valueChanges();
    item$.pipe(take(1)).subscribe( item => {
      item = item ? item : {};
      item$F.update({
        quantity: ((<any>item).quantity || 0) + number,
        product: product
      });
    }
  );
}
}
