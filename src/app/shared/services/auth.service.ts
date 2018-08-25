import { AppUser } from 'shared/models/app-user';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    localStorage.removeItem('setAdmin');
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginAsAdmin() {
    localStorage.setItem('setAdmin', 'true');
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .pipe(
      switchMap(
      user => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return of(null);
      }
    ));
  }
}
