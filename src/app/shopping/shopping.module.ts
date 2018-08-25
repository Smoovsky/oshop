import { CheckoutComponent } from './components/checkout/checkout.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CartSummaryComponent } from './components/shopping-cart/cart-summary/cart-summary.component';
import { ProductFilterComponent } from 'shared/components/product-filter/product-filter.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shopping-cart/shipping-form/shipping-form.component';
import { ProductFormComponent } from '../admin/components/product-form/product-form.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductsComponent },
      {path: 'products/:id', component: ProductFormComponent },
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
    ])
  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    CartSummaryComponent,
    CheckoutComponent,
    ShippingFormComponent,
  ],
  exports: [
    ProductsComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    CartSummaryComponent,
    CheckoutComponent,
    ShippingFormComponent,
  ]
})
export class ShoppingModule { }
