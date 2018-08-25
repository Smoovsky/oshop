import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular5-data-table';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  imports: [
    DataTableModule.forRoot(),
    CommonModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  exports: [
    DataTableModule.forRoot().ngModule,
    CommonModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule,
    FormsModule,
    ProductCardComponent,
    ProductQuantityComponent,
    RouterModule
  ]
})
export class SharedModule { }
