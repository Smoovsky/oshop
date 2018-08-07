import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  // user: User;
  // user$: Observable<User>;

  constructor(public auth: AuthService) {
      // afAuth.authState.subscribe(
      //   user => this.user = user
      // );
      // this.user$ = afAuth.authState;
  }

  logout() {
    this.auth.logout();
  }
}
