import { Cart } from 'shared/models/Cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  // user: User;
  // user$: Observable<User>;
  appUser: AppUser;
  cart$: Observable<Cart>;

  constructor(private auth: AuthService, private cartServie: ShoppingCartService) {
      // afAuth.authState.subscribe(
      //   user => this.user = user
      // );
      // this.user$ = afAuth.authState;
  }

  logout() {
    this.auth.logout();
  }

  login() {
    this.auth.login();
  }

  loginAsAdmin() {
    this.auth.loginAsAdmin();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartServie.getCart();
  }
}
