import { OverviewComponent } from './core/components/overview/overview.component';
import { OrderModule } from './order/order.module';
import { ShoppingModule } from './shopping/shopping.module';
import { HomeComponent } from './core/components/home/home.component';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgRedux,NgReduxModule} from '@angular-redux/store';
import {IAppState,rootReducer,INITIAL_STATE} from './store/store'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'products', 
        component: HomeComponent 
      },
      // {
      //   path: 'admin',
      //   loadChildren: () => AdminModule
      // }
    ]),
    CoreModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    MatSidenavModule,
    FlexLayoutModule,
    NgReduxModule,
    OrderModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer,INITIAL_STATE);
  }
}
