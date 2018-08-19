import { ProductService } from '../../product.service';
import { CategoryService } from '../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productServie: ProductService,
    private router: Router,
  ) {
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productServie.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
    }
   }

   save(product) {
    if (this.id) {
      this.productServie.update(this.id, product);
      this.router.navigate(['/admin/products']);
      return null;
    }

    this.productServie.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {return; }
    this.productServie.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
