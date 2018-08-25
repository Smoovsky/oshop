import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ProductsComponent } from './shopping/components/products/products.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
    ]),
    SharedModule,
    ShoppingModule,
    AdminModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
