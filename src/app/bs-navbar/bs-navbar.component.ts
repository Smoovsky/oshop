import { AppUser } from 'models/app-user';
import { AuthService } from '../auth.service';
import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  // user: User;
  // user$: Observable<User>;
  appUser: AppUser;

  constructor(public auth: AuthService) {
      // afAuth.authState.subscribe(
      //   user => this.user = user
      // );
      // this.user$ = afAuth.authState;
      auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }
}
