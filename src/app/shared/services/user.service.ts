import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: User, setAdmin = false) {
    if (setAdmin) {
      this.db.object('/users/' + user.uid).update({
        name: user.displayName,
        email: user.email,
        isAdmin: true
      });
    } else {
      this.db.object('/users/' + user.uid).update({
        name: user.displayName,
        email: user.email,
        isAdmin: false
      });
    }

  }

  get(uid): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
