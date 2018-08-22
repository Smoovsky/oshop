import { map } from 'rxjs/operators';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) { }

  async placeOrder(order) {
    const result = await this.db.list('orders').push(order);
    this.cartService.clearAll();
    return result;
  }

  getAll() {
    return this.db.list('/orders').snapshotChanges().pipe(
      map(a =>
        a.map(
          o =>
          ({
            ...o.payload.val(),
            id: o.key
          })
        )
      )
    );
  }
  getOrderByCustomer(userId) {
    return this.db.list('/order', ref => ref.orderByChild('userId')
    .equalTo(userId))
    .snapshotChanges()
    .pipe(map(
      a =>
        a.map(
          o =>
            ({
              order: o.payload.val(),
              key: o.key
    }))));
  }
  getOrder(id) {
    return this.db.object('/order/' + id).valueChanges();
  }
}
