import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }



  getCategories() {
    return this.db.list('/categories', ref => ref.orderByChild('name')) // .equalTo('Bread'))
    .snapshotChanges()
    .pipe(
      map(action => {
        return action.map(
          a => ({key: a.key, ...a.payload.val()})
        );
      })
    );
  }
}