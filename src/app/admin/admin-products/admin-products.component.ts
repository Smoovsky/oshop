import { Product } from './../../../../models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  filteredProducts: Product[];


  constructor(private productService: ProductService) {
    this.subscription = productService.getAll<Product>().subscribe( p => this.filteredProducts = this.products = p);
   }

   filter(query) {
     this.filteredProducts = (query) ?
       this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
