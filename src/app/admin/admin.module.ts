import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { AdminOrderDetailComponent } from './components/admin-orders/admin-order-detail/admin-order-detail.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AuthGuard } from 'shared/services/auth-guard.service';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders/:id', component: AdminOrderDetailComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminOrderDetailComponent,
    ProductFormComponent
  ],
  providers: [
    AdminAuthGuard
  ],
  exports: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminOrderDetailComponent,
    ProductFormComponent
  ]
})
export class AdminModule { }
