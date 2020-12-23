import { SnackBarComponent } from './../shared/components/snack-bar/snack-bar.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { CoreModule } from './../core/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminAuthGuardService as AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuardService as AuthGuard } from '../core/services/auth-guard.service';
import { SingleProductDetailsResolver } from './resolvers/get-single-product-details-resolver';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CoverPhotoModalComponent } from './components/cover-photo-modal/cover-photo-modal.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AddProductComponent,
    AdminSettingsComponent,
    ProductDetailsComponent,
    CoverPhotoModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard,AdminAuthGuard]
      },
      {
        path: 'admin/addproduct',
        component: AddProductComponent,
        canActivate: [AuthGuard,AdminAuthGuard]
      },
      {
        path: 'admin/updateproduct',
        component: AddProductComponent,
        resolve: {
          productDetails: SingleProductDetailsResolver
        },
        canActivate: [AuthGuard,AdminAuthGuard]
      },
      {
        path: 'admin/settings',
        component: AdminSettingsComponent,
        canActivate: [AuthGuard,AdminAuthGuard]
      },
    ])
  ],
  providers: [
    AdminAuthGuardService
  ],
  entryComponents: [
    SnackBarComponent,
    CoverPhotoModalComponent
  ]
})
export class AdminModule { }
