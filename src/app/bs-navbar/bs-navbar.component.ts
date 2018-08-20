import { Cart } from './../../models/Cart';
import { CartItem } from './../../models/cartItem';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { AppUser } from 'src/models/app-user';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  // user: User;
  // user$: Observable<User>;
  appUser: AppUser;
  cartCount: number;

  constructor(private auth: AuthService, private cartServie: ShoppingCartService) {
      // afAuth.authState.subscribe(
      //   user => this.user = user
      // );
      // this.user$ = afAuth.authState;
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    const cart$ = (await this.cartServie.getCart()).valueChanges();
    cart$.subscribe((cart: Cart) => {
      this.cartCount = 0;
      for (const item in cart.items) {
        if (cart.items.hasOwnProperty(item)) {
          this.cartCount += cart.items[item].quantity;
        }
      }
    });
  }
}
