import { Product } from 'models/product';
import { take } from 'rxjs/operators';
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

  private getCart(cartId) {
    return this.db.list('/shopping-carts/' + cartId);
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
    const cartId = await this.getOrCreateCartId();

    const item$F = this.getItem(cartId, product.key);
    const item$ = item$F.valueChanges();
    item$.pipe(take(1)).subscribe( item => {
        item = item ? item : {};
        item$F.update({
        quantity: ((<any>item).quantity || 0) + 1,
        product: product
      });
    }
  );
}
}
