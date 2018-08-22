import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
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
    private cartService: ShoppingCartService,
    private auth: AngularFireAuth
  ) { }

  async placeOrder(order) {
    if (this.auth.authState === null) {
      return null;
    }
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
    return this.db.list('/orders', ref => ref.orderByChild('userId')
    .equalTo(userId))
    .snapshotChanges()
    .pipe(map(
      a =>
        a.map(
          o =>
          ({
            ...o.payload.val(),
            id: o.key
          }))));
  }
  getOrder(id) {
    return this.db.object('/orders/' + id).valueChanges();
  }
}
