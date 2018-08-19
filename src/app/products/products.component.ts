import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = null;
  filteredProducts = null;
  category;

  constructor(private productService: ProductService, route: ActivatedRoute) {
      productService.getAll().subscribe(p => {this.filteredProducts = this.products = p;
    });

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      if (!this.products) {
        return;
      }

      this.filteredProducts = this.category ?
        this.products.filter(p => p.category === this.category) : this.products;
    });
   }


}
