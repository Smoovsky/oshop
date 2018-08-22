import { ShoppingCartService } from '../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products = [];
  filteredProducts = [];
  category;
  subscription: Subscription;
  cart;

  constructor(private productService: ProductService, route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
      productService.getAll()
        .pipe(switchMap(p => {
          this.filteredProducts = this.products = p;
          return route.queryParamMap;
        }))
        .subscribe(
          params => {
            this.category = params.get('category');

            if (this.products.length === 0) {
              return;
            }

            this.filteredProducts = this.category ?
              this.products.filter(p => p.category === this.category) : this.products;
          }
        );
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      cart => {
        this.cart = cart;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
