import { Product } from 'src/models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  filteredProducts: Product[];
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;


  constructor(private productService: ProductService) {
    this.subscription = productService.getAll<Product>().subscribe( p => {
      this.filteredProducts = this.products = p;
      this.initializeTable(p);
    });
  }

  private initializeTable(p: Product[]) {
    this.tableResource = new DataTableResource(p);
    this.tableResource.query({offset: 0})
    .then(items => this.items = items);
    this.tableResource.count()
    .then(count => this.itemCount = count);
  }

  filter(query) {
    this.filteredProducts = (query) ?
    this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
    this.initializeTable(this.filteredProducts);
  }

  reloadItems(param) {
    this.tableResource ? this.tableResource.query(param)
      .then(items => this.items = items) : null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
