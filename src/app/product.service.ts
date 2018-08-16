import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll<T>() {
    return this.db.list<T>('/products').snapshotChanges().pipe(
      map(a =>
        a.map( p => {
            const value = <any>Object.assign({}, p.payload.val());
            value.key = p.key;
            return <T>value;
          }
      ))
    );
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product); // no id or key allowed in firebase obj
  }

  delete(id) {
    return this.db.object('/products/' + id).remove();
  }
}
