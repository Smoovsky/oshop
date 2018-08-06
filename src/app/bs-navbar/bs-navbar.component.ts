import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import {User} from 'firebase';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  // user: User;
  user$: Observable<User>;

  constructor(private auth: AuthService) {
      // afAuth.authState.subscribe(
      //   user => this.user = user
      // );
      // this.user$ = afAuth.authState;
  }

  logout() {
    this.auth.logout();
  }
}
