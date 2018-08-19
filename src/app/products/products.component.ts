import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [];
  filteredProducts = [];
  category;

  constructor(private productService: ProductService, route: ActivatedRoute) {
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


}
